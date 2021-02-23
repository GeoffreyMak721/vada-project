import * as Print from "expo-print";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";

import RNHTMLtoPDF from "react-native-html-to-pdf";

export const htmlContent = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>A simple, clean, and responsive HTML invoice template</title>

      <style>
        .invoice-box {
          max-width: 800px;
          margin: auto;
          padding: 30px;
          border: 1px solid #eee;

          font-size: 16px;
          line-height: 24px;
          font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial,
            sans-serif;
          color: #555;
        }

        .invoice-box table {
          width: 100%;
          line-height: inherit;
          text-align: left;
        }

        .invoice-box table td {
          padding: 5px;
          vertical-align: top;
        }

        .invoice-box table tr td:nth-child(2) {
          text-align: right;
        }

        .invoice-box table tr.top table td {
          padding-bottom: 20px;
        }

        .invoice-box table tr.top table td.title {
          font-size: 45px;
          line-height: 45px;
          color: #333;
        }

        .invoice-box table tr.information table td {
          padding-bottom: 40px;
        }

        .invoice-box table tr.heading td {
          background: #eee;
          border-bottom: 1px solid #ddd;
          font-weight: bold;
        }

        .invoice-box table tr.details td {
          padding-bottom: 20px;
        }

        .invoice-box table tr.item td {
          border-bottom: 1px solid #eee;
        }

        .invoice-box table tr.item.last td {
          border-bottom: none;
        }

        .invoice-box table tr.total td:nth-child(2) {
          border-top: 2px solid #eee;
          font-weight: bold;
        }

        @media only screen and (max-width: 600px) {
          .invoice-box table tr.top table td {
            width: 100%;
            display: block;
            text-align: center;
          }

          .invoice-box table tr.information table td {
            width: 100%;
            display: block;
            text-align: center;
          }
        }

        /** RTL **/
        .rtl {
          direction: rtl;
          font-family: Tahoma, "Helvetica Neue", "Helvetica", Helvetica, Arial,
            sans-serif;
        }

        .rtl table {
          text-align: right;
        }

        .rtl table tr td:nth-child(2) {
          text-align: left;
        }

        tr, td{
          border-collapse: collapse;
        }
      </style>
    </head>

    <body>
      <div class="invoice-box">
        <table cellpadding="0" cellspacing="0">
          <tr class="top">
            <td colspan="2">
              <table>
                <tr>
                  <td class="title">
                    <img
                      src="https://www.sparksuite.com/images/logo.png"
                      style="width:100%; max-width:300px;"
                    />
                  </td>

                  <td>
                    Invoice #: 123<br />
                    Created: January 1, 2015<br />
                    Due: February 1, 2015
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr class="information">
            <td colspan="2">
              <table>
                <tr>
                  <td>
                    Sparksuite, Inc.<br />
                    12345 Sunny Road<br />
                    Sunnyville, CA 12345
                  </td>

                  <td>
                    Acme Corp.<br />
                    John Doe<br />
                    john@example.com
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr class="heading">
            <td>Payment Method</td>

            <td>Check #</td>
          </tr>

          <tr class="details">
            <td>Check</td>

            <td>1000</td>
          </tr>

          <tr class="heading">
            <td>Item</td>

            <td>Price</td>
          </tr>

          <tr class="item">
            <td>Website design</td>

            <td>$300.00</td>
          </tr>

          <tr class="item">
            <td>Hosting (3 months)</td>

            <td>$75.00</td>
          </tr>

          <tr class="item last">
            <td>Domain name (1 year)</td>

            <td>$10.00</td>
          </tr>

          <tr class="total">
            <td></td>

            <td>Total: $385.00</td>
          </tr>
        </table>
      </div>
    </body>
  </html>
`;

export const createPDF = async (html) => {
  try {
    const { uri } = await Print.printToFileAsync({ html });

    let options = {
      html,
      fileName: "members",
      directory: "docs",
    };

    let file = await RNHTMLtoPDF.convert(options);
    console.log(file.filePath);
    return file.filePath;
  } catch (err) {
    console.error(err);
  }
};

export const createAndSavePDF = async (html) => {
  try {
    const uri = await createPDF(html);
    if (Platform.OS === "ios") {
      await Sharing.shareAsync(uri);
    } else {
      const permission = await MediaLibrary.requestPermissionsAsync();

      if (permission.granted) {
        await MediaLibrary.createAssetAsync(uri);
      }
    }
    return uri;
  } catch (error) {
    console.error(error);
  }
};

const createRow = (data) => `
  <tr>
    <td>${data.nom}</td>
    <td>${data.telephone}</td>
    <td>${data.adresse}</td>
    <td>${data.activite}</td>
    <td>${data.mise}</td>
  </tr>
`;

/**
 * @description Generate an `html` page with a populated table
 * @param {String} table
 * @returns {String}
 */
const createHtml = (data) => `
  <html>
    <head>
      <style>
        table {
          width: 100%;
        }
        tr {
          text-align: left;
          border: 1px solid black;
        }
        th,
        td {
          padding: 5px;
        }

        .no-content {
          background-color: red;
        }
        td,
        th {
          border: 1px solid black;
        }

        table {
          border-collapse: collapse;
        }

        td {
          font-size: 12px;
        }

        table {
          page-break-inside: auto;
          page-break-after: always;
        }
        tr {
          page-break-inside: avoid;
          page-break-after: auto;
        }

        @page {
          margin: 50px;
        }
      </style>
    </head>
    <body>
      <table>
        <tr>
          <th>Nom</th>
          <th>Telephone</th>
          <th>Adresse</th>
          <th>Activite</th>
          <th>Mise</th>
        </tr>

        ${data.map(createRow).join("")}
      </table>
    </body>
  </html>
`;

export const generateTable = async (data) => {
  try {
    const html = createHtml(data);
    console.log(html);
    console.log("Succesfully created an HTML table");

    const uri = await createPDF(html);
    return uri;
  } catch (error) {
    console.log("Error generating table", error);
  }
};
