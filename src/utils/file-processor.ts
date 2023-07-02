import Papa from "papaparse"

interface DataFile {
  data: any[]
  columns: string[]
}

/**
 * parsing CSV file to JS Object
 *
 * @param file
 * @returns
 */
export const CSVProcessor = async (file: File): Promise<DataFile> =>
  new Promise((resolve, reject) =>
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        if (results.errors.length !== 0) reject(results.errors[0].message)
        resolve({
          columns: results.meta.fields ?? [],
          data: results.data,
        })
      },
    })
  )

// /**
//  * parsing JSON
//  *
//  * @param file
//  * @returns
//  */
// export const JSONProcessor = async (file: File): Promise<DataFile> => {
//   try {
//     const text = JSON.parse(await file.text())
//     return Promise.resolve({
//       columns: [],
//       data: [],
//     })
//   } catch (error) {
//     return Promise.reject(error)
//   }
// }
