export interface ParsedMedication {
  medicineName: string;
  medicineType: string;
  dosage: string;
  quantity: number;
  frequency: string;
}

export async function parseMedicationText(text: string) {
  var response = await parsePrescriptionTextByGrok(text);
  if (response.error) {
    console.error('Error parsing text:', response.message);
    return parseMedicationTextManually(text);
  }
  return response;
}

function parseMedicationTextManually(text: string): ParsedMedication {
  const raw = text
    .replace(/[^\w\s\/.%]/gi, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

  const medLineMatch = text.match(/([A-Z][A-Z0-9\s\-\/]{2,})\s?(?:mg|mcg|gm|ml|caps?|tabs?|inj|syp)/i);
  const medicineName = medLineMatch ? medLineMatch[1].trim().split(/\s+/)[1] || '' : '';

  const dosageMatch = raw.match(/(\d+(?:mg|mcg|ml|gm)(?:\/\d+(?:mg|mcg|ml|gm))?)/);
  const dosage = dosageMatch ? dosageMatch[1].toUpperCase() : '';

  const typeMap: Record<string, string> = {
    tab: 'Pill',
    tabs: 'Pill',
    tablet: 'Pill',
    tblts: 'Pill',
    cap: 'capsule',
    caps: 'capsule',
    capsule: 'capsule',
    syp: 'Syrup',
    syrup: 'Syrup',
    inj: 'Injection',
    injection: 'Injection',
    ointment: 'ointment',
    cream: 'ointment',
    patch: 'patch',
    fc: 'Pill',
  };
  const typeMatch = raw.match(/\b(fc\s+)?(tab|tabs|tablet|tblts|cap|caps|capsule|syp|syrup|inj|injection|ointment|cream|patch)\b/);
  const medicineType = typeMatch ? typeMap[typeMatch[2]] : '';

  const qtyMatch = raw.match(/(?:qty|quantity|dispense|total)[^\d]{0,4}(\d{1,4})/i);
  const quantity = qtyMatch ? parseInt(qtyMatch[1], 10) : 0;

  const frequencyPatterns: Record<string, string[]> = {
    'Once a day': ['once a day', 'once daily', '1x/day', 'one time a day', 'one daily', 'one a day'],
    'Twice a day': ['twice a day', '2x/day', 'two times a day', 'bd'],
    'Three times a day': ['three times a day', '3x/day', 'tid', 'three daily', 'three time daily', 'nree time daily'],
    'Everyday': ['every day', 'everyday', 'daily'],
    'Weekly': ['weekly', 'once a week'],
  };

  let frequency = '';
  for (const [label, variations] of Object.entries(frequencyPatterns)) {
    if (variations.some(v => raw.includes(v))) {
      frequency = label;
      break;
    }
  }

  if (!frequency && /one every/.test(raw)) frequency = 'Once a day';

  return {
    medicineName,
    medicineType,
    dosage,
    quantity,
    frequency,
  };
}

async function parsePrescriptionTextByGrok(text: string) {
  const prompt = `
      You are a clinically trained medical label parser. Your task is to extract structured medication-related data from unstructured, messy, and inconsistent text such as OCR scans, handwritten prescriptions, or pharmacy labels.

      The input text may include irrelevant content (e.g., names, store info, contact numbers, addresses, dates), random casing, typos, line breaks, or characters. Extract only the medication-related information accurately and reliably.

      ---

      Return a valid JSON object with the following fields:

      - "medicineName": A **real**, known drug name (e.g., "Amoxicillin").
          - Return "" if not confidently identifiable.
          - Do NOT include: person names, prescribers, pharmacies, gibberish, or made-up terms.
          - If multiple potential medicines are listed, select only the **primary** one.

      - "medicineType": One of the following normalized forms: "Pill", "capsule", "Syrup", "Injection", "ointment", "patch", etc.
          - Be flexible with input variations like "tabs", "tab", "tblts", "syp", "inj", etc.
          - Normalize inconsistent terms into the standard form.
          - Return "" if unclear or not provided.

      - "dosage": The strength and unit of the medication (e.g., "500mg", "250 mcg", "5mL").
          - Handle variations like: "500 mg", "0.5gm", "mg. 500", "each tab contains 250mg".
          - Only extract **single numeric strength + unit** that refers to the medicine.
          - Return "" if not found or unclear.

      - "quantity": The total number of units dispensed.
          - Accept various notations: "QTY: 20", "20 TABS", "dispense: 15", "total: 90", "Qty=60", etc.
          - Normalize to an integer only.
          - Return 0 if quantity is not found or not clearly stated.

      - "frequency": Normalize the medication frequency to **one of** the following exact values:
          - "Once a day"
          - "Twice a day"
          - "Three times a day"
          - "Everyday"
          - "Weekly"
          - Return "" if unclear or missing

          Handle vast variations like:
          - Text-based: "Take once daily", "once per day", "every day", "two times daily", "three times a day", "weekly dose"
          - Abbreviations: "OD", "BD", "TID", "QHS", "1x/day", "3x/day", "every 8 hrs"
          - OCR errors: Correct typos like "NREE TIME DAILY" → "Three times a day"

      ---

      Parsing rules:
      - Do **not** guess or hallucinate information.
      - Be cautious with noisy, multi-line text — ignore any content not clearly linked to medication.
      - If unsure about a value, leave it empty ("") or use 0 for quantity.
      - Do not confuse dosage (e.g., "500mg") with quantity (e.g., "QTY: 30").
      - If conflicting values exist, prioritize the most **clearly labeled and common-sense value**.
      - Output must be **strictly valid JSON**. No headers, no markdown, no explanation, no formatting.

      Your response must only include the raw JSON, starting with 'and ending with'. Any additional text will break the output.

      If no meaningful data is found, return:
      {
        "medicineName": "",
        "medicineType": "",
        "dosage": "",
        "quantity": 0,
        "frequency": ""
      }

      ---

      Raw input:
      """
      ${text}
      """
      `;

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer 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',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.2,
      }),
    });

    const data = await response.json();

    if (!data.choices || !data.choices[0]?.message?.content) {
      console.error('Groq API response:', JSON.stringify(data, null, 2));
      throw new Error('Groq response malformed or empty');
    }

    const message = data.choices[0].message.content.trim();

    let parsed;
    try {
      parsed = JSON.parse(message);
    } catch (err) {
      console.error('Model returned non-JSON response:', message);
      throw new Error(`Model returned invalid JSON:\n${message}`);
    }

    return parsed;
  } catch (err) {
    console.error('Parsing Error:', err.message);
    return { error: true, message: err.message };
  }
}
