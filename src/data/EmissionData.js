// Example emissions data (replace later with your actual data)
const emissionsData = {
    CN: { emissions: "12,667,428,430", rank: 1 },
                    US: { emissions: "4,853,780,240", rank: 2 },
                    IN: { emissions: "2,693,034,100", rank: 3 },
                    RU: { emissions: "1,909,039,310", rank: 4 },
                    JP: { emissions: "1,082,645,430", rank: 5 },
                    ID: { emissions: "692,236,110", rank: 6 },
                    IR: { emissions: "686,415,730", rank: 7 },
                    DE: { emissions: "673,595,260", rank: 8 },
                    KR: { emissions: "635,502,970", rank: 9 },
                    SA: { emissions: "607,907,500", rank: 10 },
                    CA: { emissions: "578,167,570", rank: 11 },
                    BR: { emissions: "457,244,470", rank: 12 },
                    MX: { emissions: "436,990,680", rank: 13 },
                    ZA: { emissions: "393,479,690", rank: 14 },
                    TR: { emissions: "392,291,910", rank: 15 },
                    AU: { emissions: "370,971,290", rank: 16 },
                    GB: { emissions: "331,531,150", rank: 17 },
                    IT: { emissions: "319,774,540", rank: 18 },
                    FR: { emissions: "302,462,420", rank: 19 },
                    PL: { emissions: "298,804,640", rank: 20 },
                    TH: { emissions: "280,885,200", rank: 21 },
                    KZ: { emissions: "276,662,930", rank: 22 },
                    ES: { emissions: "259,873,930", rank: 23 },
                    MY: { emissions: "258,898,100", rank: 24 },
                    VN: { emissions: "246,677,180", rank: 25 },
                    PK: { emissions: "245,961,210", rank: 26 },
                    UA: { emissions: "195,962,490", rank: 27 },
                    EG: { emissions: "194,161,600", rank: 28 },
                    AR: { emissions: "187,470,970", rank: 29 },
                    AE: { emissions: "183,971,760", rank: 30 },
                    IQ: { emissions: "181,422,240", rank: 31 },
                    DZ: { emissions: "176,774,780", rank: 32 },
                    NL: { emissions: "167,957,740", rank: 33 },
                    PH: { emissions: "156,934,820", rank: 34 },
                    UZ: { emissions: "144,773,000", rank: 35 },
                    CO: { emissions: "103,268,260", rank: 36 },
                    KW: { emissions: "101,943,060", rank: 37 },
                    CZ: { emissions: "96,345,670", rank: 38 },
                    QA: { emissions: "93,855,090", rank: 39 },
                    BE: { emissions: "90,212,750", rank: 40 },
                    BD: { emissions: "89,985,490", rank: 41 },
                    CL: { emissions: "87,485,110", rank: 42 },
                    VE: { emissions: "86,622,480", rank: 43 },
                    BY: { emissions: "83,709,630", rank: 44 },
                    RO: { emissions: "82,799,510", rank: 45 },
                    AT: { emissions: "72,281,930", rank: 46 },
                    IL: { emissions: "71,348,170", rank: 47 },
                    TM: { emissions: "70,806,020", rank: 48 },
                    GR: { emissions: "65,926,090", rank: 49 },
                    NG: { emissions: "65,821,380", rank: 50 },
                    PE: { emissions: "59,765,980", rank: 51 },
                    CH: { emissions: "36,287,590", rank: 52 },
                    PT: { emissions: "35,540,530", rank: 53 },
                    HU: { emissions: "35,318,640", rank: 54 },
                    SE: { emissions: "34,606,850", rank: 55 },
                    FI: { emissions: "33,840,470", rank: 56 },
                    MA: { emissions: "33,041,880", rank: 57 },
                    RS: { emissions: "32,436,300", rank: 58 },
                    NO: { emissions: "32,345,090", rank: 59 },
                    BG: { emissions: "31,847,260", rank: 60 },
                    SG: { emissions: "30,636,480", rank: 61 },
                    NZ: { emissions: "30,312,560", rank: 62 },
                    SK: { emissions: "29,388,610", rank: 63 },
                    IE: { emissions: "29,324,730", rank: 64 },
                    OM: { emissions: "29,251,220", rank: 65 },
                    HR: { emissions: "21,882,030", rank: 66 },
                    SY: { emissions: "21,331,490", rank: 67 },
                    TN: { emissions: "20,693,150", rank: 68 },
                    LT: { emissions: "15,718,300", rank: 69 },
                    SI: { emissions: "14,993,900", rank: 70 },
                    LV: { emissions: "11,996,210", rank: 71 },
                    EE: { emissions: "10,947,880", rank: 72 },
                    IS: { emissions: "10,437,640", rank: 73 },
                    LU: { emissions: "9,995,070", rank: 74 },
                    GE: { emissions: "9,675,440", rank: 75 },
                    MK: { emissions: "9,158,920", rank: 76 },
                    AM: { emissions: "6,587,330", rank: 77 },
                    BA: { emissions: "6,278,440", rank: 78 },
                    AL: { emissions: "5,732,670", rank: 79 },
                    MD: { emissions: "5,124,560", rank: 80 },
                    MN: { emissions: "4,873,760", rank: 81 },
                    CY: { emissions: "4,710,420", rank: 82 },
                    ME: { emissions: "4,180,050", rank: 83 },
                    BN: { emissions: "3,958,880", rank: 84 },
                    JM: { emissions: "3,624,590", rank: 85 },
                    MU: { emissions: "3,507,660", rank: 86 },
                    TT: { emissions: "3,442,100", rank: 87 },
                    NA: { emissions: "3,319,500", rank: 88 },
                    BW: { emissions: "3,073,480", rank: 89 },
                    PG: { emissions: "2,893,740", rank: 90 },
                    PY: { emissions: "2,656,320", rank: 91 },
                    GA: { emissions: "2,488,410", rank: 92 },
                    GQ: { emissions: "2,418,650", rank: 93 },
                    BH: { emissions: "2,317,770", rank: 94 },
                    MT: { emissions: "2,272,300", rank: 95 },
                    GY: { emissions: "2,190,230", rank: 96 },
                    SR: { emissions: "2,077,540", rank: 97 },
                    FJ: { emissions: "2,007,380", rank: 98 },
                    SZ: { emissions: "1,987,640", rank: 99 },
                    BT: { emissions: "1,928,760", rank: 100 },
                    SN: { emissions: "12,074,690", rank: 101 }, // Senegal
                    GE: { emissions: "12,013,890", rank: 102 }, // Georgia
                    PA: { emissions: "11,384,020", rank: 103 }, // Panama
                    EE: { emissions: "10,847,950", rank: 104 }, // Estonia
                    HN: { emissions: "10,612,630", rank: 105 }, // Honduras
                    TJ: { emissions: "10,551,280", rank: 106 }, // Tajikistan
                    KG: { emissions: "10,303,360", rank: 107 }, // Kyrgyzstan
                    ZW: { emissions: "10,223,730", rank: 108 }, // Zimbabwe
                    CM: { emissions: "10,080,190", rank: 109 }, // Cameroon
                    MZ: { emissions: "10,028,180", rank: 110 }, // Mozambique
                    PY: { emissions: "9,932,550", rank: 111 }, // Paraguay
                    BJ: { emissions: "9,619,540", rank: 112 }, // Benin
                    BN: { emissions: "9,375,650", rank: 113 }, // Brunei
                    ZM: { emissions: "9,270,700", rank: 114 }, // Zambia
                    MD: { emissions: "8,652,070", rank: 115 }, // Moldova
                    CR: { emissions: "8,608,370", rank: 116 }, // Costa Rica
                    UY: { emissions: "8,541,520", rank: 117 }, // Uruguay
                    MK: { emissions: "8,336,480", rank: 118 }, // North Macedonia
                    BW: { emissions: "8,213,720", rank: 119 }, // Botswana
                    SV: { emissions: "7,972,430", rank: 120 }, // El Salvador
                    LU: { emissions: "7,586,820", rank: 121 }, // Luxembourg
                    UG: { emissions: "7,540,270", rank: 122 }, // Uganda
                    CY: { emissions: "7,460,310", rank: 123 }, // Cyprus
                    CG: { emissions: "7,435,820", rank: 124 }, // Congo
                    ML: { emissions: "6,725,970", rank: 125 }, // Mali
                    LV: { emissions: "6,705,370", rank: 126 }, // Latvia
                    AM: { emissions: "6,326,530", rank: 127 }, // Armenia
                    JM: { emissions: "6,083,040", rank: 128 }, // Jamaica
                    BF: { emissions: "5,820,480", rank: 129 }, // Burkina Faso
                    NI: { emissions: "5,734,390", rank: 130 }, // Nicaragua
                    AF: { emissions: "5,675,770", rank: 131 }, // Afghanistan
                    MW: { emissions: "5,627,530", rank: 132 }, // Malawi
                    GA: { emissions: "5,516,570", rank: 133 }, // Gabon
                    NC: { emissions: "5,361,860", rank: 134 }, // New Caledonia
                    GQ: { emissions: "5,053,870", rank: 135 }, // Equatorial Guinea
                    PG: { emissions: "4,715,910", rank: 136 }, // Papua New Guinea
                    MR: { emissions: "4,611,630", rank: 137 }, // Mauritania
                    AL: { emissions: "4,486,220", rank: 138 }, // Albania
                    NA: { emissions: "4,287,830", rank: 139 }, // Namibia
                    MU: { emissions: "4,281,810", rank: 140 }, // Mauritius
                    GY: { emissions: "3,804,000", rank: 141 }, // Guyana
                    GN: { emissions: "3,801,720", rank: 142 }, // Guinea
                    IS: { emissions: "3,558,320", rank: 143 }, // Iceland
                    CD: { emissions: "3,551,810", rank: 144 }, // DR Congo
                    HT: { emissions: "3,437,040", rank: 145 }, // Haiti
                    SR: { emissions: "3,289,020", rank: 146 }, // Suriname
                    MG: { emissions: "3,190,000", rank: 147 }, // Madagascar
                    RE: { emissions: "2,736,530", rank: 148 }, // Réunion
                    NE: { emissions: "2,633,180", rank: 149 }, // Niger
                    TG: { emissions: "2,437,950", rank: 150 }, // Togo
                    MO: { emissions: "2,247,400", rank: 151 }, // Macao
                    MV: { emissions: "2,181,070", rank: 152 }, // Maldives
                    TD: { emissions: "2,110,370", rank: 153 }, // Chad
                    MT: { emissions: "1,715,420", rank: 154 }, // Malta
                    BT: { emissions: "1,712,460", rank: 155 }, // Bhutan
                    FJ: { emissions: "1,692,890", rank: 156 }, // Fiji
                    RW: { emissions: "1,626,440", rank: 157 }, // Rwanda
                    LR: { emissions: "1,622,810", rank: 158 }, // Liberia
                    BS: { emissions: "1,446,220", rank: 159 }, // Bahamas
                    PW: { emissions: "1,357,050", rank: 160 }, // Palau
                    SZ: { emissions: "1,348,890", rank: 161 }, // Eswatini
                    SL: { emissions: "1,099,700", rank: 162 }, // Sierra Leone
                    SC: { emissions: "1,095,060", rank: 163 }, // Seychelles
                    CV: { emissions: "1,015,010", rank: 164 }, // Cabo Verde
                    PF: { emissions: "956,700", rank: 165 }, // French Polynesia
                    SO: { emissions: "940,570", rank: 166 }, // Somalia
                    BI: { emissions: "924,150", rank: 167 }, // Burundi
                    GP: { emissions: "904,520", rank: 168 }, // Guadeloupe
                    MQ: { emissions: "899,240", rank: 169 }, // Martinique
                    ER: { emissions: "804,660", rank: 170 }, // Eritrea
                    LS: { emissions: "779,000", rank: 171 }, // Lesotho
                    DJ: { emissions: "761,120", rank: 172 }, // Djibouti
                    BB: { emissions: "674,170", rank: 173 }, // Barbados
                    GI: { emissions: "663,620", rank: 174 }, // Gibraltar
                    GM: { emissions: "611,740", rank: 175 }, // Gambia
                    TL: { emissions: "572,620", rank: 176 }, // Timor-Leste
                    GL: { emissions: "465,940", rank: 177 }, // Greenland
                    AW: { emissions: "455,060", rank: 178 }, // Aruba
                    WS: { emissions: "355,420", rank: 179 }, // Samoa
                    GF: { emissions: "354,590", rank: 180 }, // French Guiana
                    GW: { emissions: "350,090", rank: 181 }, // Guinea-Bissau
                    KM: { emissions: "342,880", rank: 182 }, // Comoros
                    SB: { emissions: "318,050", rank: 183 }, // Solomon Islands
                    BM: { emissions: "317,540", rank: 184 }, // Bermuda
                    KY: { emissions: "307,220", rank: 185 }, // Cayman Islands
                    AG: { emissions: "277,650", rank: 186 }, // Antigua and Barbuda
                    CF: { emissions: "276,060", rank: 187 }, // Central African Republic
                    BZ: { emissions: "269,430", rank: 188 }, // Belize
                    LC: { emissions: "254,790", rank: 189 }, // Saint Lucia
                    EH: { emissions: "241,500", rank: 190 }, // Western Sahara
                    VU: { emissions: "218,140", rank: 191 }, // Vanuatu
                    TO: { emissions: "166,860", rank: 192 }, // Tonga
                    ST: { emissions: "157,900", rank: 193 }, // Sao Tome & Principe
                    GD: { emissions: "122,490", rank: 194 }, // Grenada
                    CK: { emissions: "107,800", rank: 195 }, // Cook Islands
                    KN: { emissions: "101,920", rank: 196 }, // Saint Kitts & Nevis
                    TC: { emissions: "88,360", rank: 197 }, // Turks and Caicos
                    VC: { emissions: "82,790", rank: 198 }, // St. Vincent & Grenadines
                    KI: { emissions: "73,960", rank: 199 }, // Kiribati
                    DM: { emissions: "68,810", rank: 200 },  // Dominica
                    NP: { emissions: "68,810", rank: 95 },  //Nepal
                    LK: { emissions: "18,535,920", rank: 91 },  //Nepal

};
    
    export default emissionsData;