import { Request, Response } from 'express';
import { JWT } from 'google-auth-library';
import { GoogleSpreadsheet } from 'google-spreadsheet';

require('dotenv').config();
export const GSheetController = async (req: Request, res: Response) => {
  try {
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet('1rSyxb8YEthyVU_FJyz2zsS2VVn2z97_idoPjZ4BGlGU', serviceAccountAuth);
    await doc.loadInfo(); 

    console.log('Title:', doc.title);

    const sheet = doc.sheetsByIndex[0];

    // Assuming req.body contains the data in the format you provided
    const data = req.body;

    // Load the header row or create one if it doesn't exist
    await sheet.loadHeaderRow();
    if (!sheet.headerValues.includes('Question ID')) {
      const header = ['Question ID', 'Question Text', 'Mandatory', 'Created At', 'Updated At'];
      await sheet.setHeaderRow(header);
    }

    // Insert data into the sheet
    for (const question of data.questions) {
      const values = [question.id, question.text, question.mandatory, question.createdAt, question.updatedAt];
      await sheet.addRow(values);
    }

    res.status(200).json({ message: 'Data added to Google Sheet.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while adding data to Google Sheet.' });
  }
};