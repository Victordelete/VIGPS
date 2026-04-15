import { File, Paths } from 'expo-file-system/next';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

export async function saveCSV(data, file_name) {
    const csvContent = convertToCSV(data);
    const fileUri = file_name + '_gps_data.csv';
    
    const file = new File(Paths.document, fileUri);
    file.write(csvContent);
    
    const isAvailable = await Sharing.isAvailableAsync();
    if (isAvailable) {
        await Sharing.shareAsync(file.uri, { mimeType: 'text/csv' });
    }
    return file.uri;
}

function convertToCSV(data) {
    if (!data || !data.length) return '';

    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(item =>
        Object.values(item).join(',')
    );

    return [headers, ...rows].join('\n');
}