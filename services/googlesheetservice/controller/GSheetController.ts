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
    await doc.updateProperties({ title: 'renamed doc' });

    const sheet = doc.sheetsByIndex[0];
    console.log('Sheet title:', sheet.title);
    console.log('Row count:', sheet.rowCount);

    res.status(200).json({ message: 'Google Sheet data fetched and logged.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching Google Sheet data.' });
  }
};
