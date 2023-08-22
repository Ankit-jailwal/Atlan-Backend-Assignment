import { JWT } from 'google-auth-library';
import { GoogleSpreadsheet } from 'google-spreadsheet';

require('dotenv').config();

export const GSheetController = async (form : string) => {
  try {

    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    
    const doc = new GoogleSpreadsheet('1rSyxb8YEthyVU_FJyz2zsS2VVn2z97_idoPjZ4BGlGU', serviceAccountAuth);
    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[0];

    const data = JSON.parse(form);

    await sheet.loadHeaderRow();
    if (!sheet.headerValues.includes('Form Title')) {
      const header = ['Form Title', 'Question', 'Answer', 'Response ID', 'Form ID'];
      await sheet.setHeaderRow(header);
    }

    for (const question of data.questions) {
      const values = [
        data.form.title,
        question.text,
        question.answers[0]?.text || '',
        data.responseId,
        data.form.id,
      ];
      await sheet.addRow(values);
    }

    await sheet.loadCells('A1:E1');

    const formTitleCell = sheet.getCell(0, 0); 
    formTitleCell.value = 'Form Title';
    formTitleCell.textFormat = { bold: true, fontSize: 14 };
    formTitleCell.save();

    const headerCells = [
      sheet.getCell(0, 1), 
      sheet.getCell(0, 2), 
      sheet.getCell(0, 3), 
      sheet.getCell(0, 4),
    ];
    const headerLabels = ['Question', 'Answer', 'Response ID', 'Form ID'];

    for (let i = 0; i < headerCells.length; i++) {
      const headerCell = headerCells[i];
      headerCell.value = headerLabels[i];
      headerCell.textFormat = { bold: true, fontSize: 12 };
      headerCell.save();
    }

    console.log('Data added to Google Sheet.');

  } catch (error) {
    console.error(error);
    console.log('An error occurred while adding data to Google Sheet.');
  }
};
