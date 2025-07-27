import fs from 'fs';
import path from 'path';
import axios from 'axios';

async function processRecord(filePath) {
    let recordConfig;
    let subdomain;

    try {
        console.log(`[Message] Processing file: ${filePath}`);
        subdomain = path.basename(filePath, '.json');

        const fileContent = fs.readFileSync(filePath, 'utf8');

        recordConfig = JSON.parse(fileContent);
        console.log(recordConfig)
    } catch (error) {
        console.error(`[Error] Failed to read ${filePath}`);
        process.exit(1);
    }

    const CF_API_TOKEN = process.env.CF_API_TOKEN;
    const CF_ZONE_ID = process.env.CF_ZONE_ID;
    const rootDomain = 'moe.page';

    if (!CF_API_TOKEN || !CF_ZONE_ID) {
        console.error('[Error] Global Variable CF_API_TOKEN and/or CF_ZONE_ID are missing!');
        process.exit(1);
    }

    const apiUrl = `https://api.cloudflare.com/client/v4/zones/${CF_ZONE_ID}/dns_records`;
    const headers = {
        'Authorization': `Bearer ${CF_API_TOKEN}`,
        'Content-Type': 'application/json',
    };


    for (const [recordType, recordValues] of Object.entries(recordConfig.records)) {
        for (const recordContent of recordValues) {
            const recordData = {
                type: recordType,
                name: `${recordConfig.domain}.${rootDomain}`,
                content: recordContent,
                proxied: recordConfig.proxied || false,
                ttl: recordConfig.ttl || 120
            };


            if (recordData.type !== 'A' && recordData.type !== 'AAAA' && recordData.type !== 'CNAME') {
                recordData.proxied = false;
            }

            console.log(`[Message] Prepare record:`, recordData);

            try {


                const getResponse = await axios.get(apiUrl, {
                    headers,
                    params: { name: recordData.name, type: recordData.type, content: recordData.content }
                });
                const existingRecords = getResponse.data.result;

                if (existingRecords.length > 0) {
                    const recordId = existingRecords[0].id;
                    console.log(`[Message] Record exist! (ID: ${recordId})，Updating...`);
                    await axios.put(`${apiUrl}/${recordId}`, recordData, { headers });
                    console.log(`[Success] Record ${recordData.name} successfully updated`);
                } else {
                    console.log(`[Message] Record not exist，Create record...`);
                    await axios.post(apiUrl, recordData, { headers });
                    console.log(`[Success] Record ${recordData.name} created`);
                }


            } catch (error) {
                console.error(`[Error] Conn with CF API :`, error.response?.data || error.message);
                process.exit(1);
            }
        }

    }
}



const filePath = process.argv[2];

if (!filePath) {
    console.error('[Error] Please provide a file path as a parameter!');
    process.exit(1);
}

processRecord(filePath);