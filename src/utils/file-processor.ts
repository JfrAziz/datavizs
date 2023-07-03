import Papa from "papaparse"

export interface RawData {
  data: any[]
  columns: string[]
}

/**
 * parsing CSV file to JS Object
 *
 * @param file
 * @returns
 */
export const CSVProcessor = async (file: File): Promise<RawData> =>
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

/**
 * parsing JSON
 *
 * @param file
 * @returns
 */
export const JSONProcessor = async (file: File): Promise<RawData> =>
  new Promise(async (resolve, reject) => {
    try {
      const jsonText = await JSON.parse(await file.text())

      if (!Array.isArray(jsonText) || jsonText.length === 0)
        throw Error("not valid JSON file")

      const columns = Object.keys(jsonText[0])

      resolve({
        columns: columns,
        data: jsonText,
      })
    } catch (error: any) {
      reject(error.toString())
    }
  })
