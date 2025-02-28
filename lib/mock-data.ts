export const mockChatHistory = [
  {
    id: 1,
    title: "Question about IPC Section 302",
    date: "2025-02-15T10:30:00Z",
    messages: [
      {
        id: 1,
        role: "user",
        content: "What is IPC Section 302?",
        timestamp: "2025-02-15T10:30:00Z",
      },
      {
        id: 2,
        role: "assistant",
        content:
          "IPC Section 302 deals with punishment for murder. According to this section, whoever commits murder shall be punished with death, or imprisonment for life, and shall also be liable to fine.",
        timestamp: "2025-02-15T10:30:30Z",
      },
    ],
    tags: ["Criminal Law", "IPC"],
    bookmarked: true,
  },
  {
    id: 2,
    title: "Property inheritance rights",
    date: "2025-02-14T15:45:00Z",
    messages: [
      {
        id: 1,
        role: "user",
        content: "What are my rights regarding ancestral property inheritance?",
        timestamp: "2025-02-14T15:45:00Z",
      },
      {
        id: 2,
        role: "assistant",
        content:
          "In India, ancestral property inheritance rights vary based on religion and personal laws. Under Hindu law, sons and daughters have equal rights to ancestral property since the 2005 amendment to the Hindu Succession Act. For Muslims, inheritance follows Sharia law with specific shares for different heirs.",
        timestamp: "2025-02-14T15:45:30Z",
      },
    ],
    tags: ["Property Law", "Inheritance"],
    bookmarked: false,
  },
  {
    id: 3,
    title: "Divorce procedure in India",
    date: "2025-02-13T09:15:00Z",
    messages: [
      {
        id: 1,
        role: "user",
        content: "What is the procedure for divorce in India?",
        timestamp: "2025-02-13T09:15:00Z",
      },
      {
        id: 2,
        role: "assistant",
        content:
          "Divorce procedures in India vary based on religion. Under the Hindu Marriage Act, you can file for divorce on grounds like adultery, cruelty, desertion, etc. The process typically involves filing a petition in family court, followed by mediation attempts, and if unsuccessful, court proceedings which may take 6-18 months.",
        timestamp: "2025-02-13T09:15:30Z",
      },
    ],
    tags: ["Family Law", "Divorce"],
    bookmarked: true,
  },
  {
    id: 4,
    title: "Reporting corruption",
    date: "2025-02-12T14:20:00Z",
    messages: [
      {
        id: 1,
        role: "user",
        content: "How can I report corruption in a government project?",
        timestamp: "2025-02-12T14:20:00Z",
      },
      {
        id: 2,
        role: "assistant",
        content:
          "You can report corruption in government projects through several channels: 1) File a complaint with the Central Vigilance Commission (CVC) online or by post, 2) Use the whistleblower protection mechanism under the Whistleblowers Protection Act, 3) File an RTI application to seek information about the project, 4) Report to the Anti-Corruption Bureau of your state, or 5) File a complaint with the lokayukta in states where it exists.",
        timestamp: "2025-02-12T14:20:30Z",
      },
    ],
    tags: ["Anti-Corruption", "Government"],
    bookmarked: false,
  },
]

export const mockLegalDocuments = [
  {
    id: 1,
    title: "IPC Section 302",
    description: "Punishment for murder under Indian Penal Code",
    content:
      "302. Punishment for murder.—Whoever commits murder shall be punished with death, or imprisonment for life, and shall also be liable to fine. The courts have interpreted this section in various judgments, establishing that the prosecution must prove beyond reasonable doubt that the accused had the intention to cause death or bodily injury sufficient in the ordinary course of nature to cause death.",
    type: "IPC",
    date: "2025-01-15T10:30:00Z",
  },
  {
    id: 2,
    title: "Hindu Marriage Act, 1955",
    description: "Legal framework for Hindu marriages in India",
    content:
      "The Hindu Marriage Act is an Act of the Parliament of India enacted in 1955. The Act provides for the solemnization of marriage between Hindus and others. Section 13 of the Hindu Marriage Act provides grounds for divorce including adultery, cruelty, desertion, conversion to another religion, mental disorder, communicable disease, renunciation of the world, and presumption of death.",
    type: "Act",
    date: "2025-01-20T15:45:00Z",
  },
  {
    id: 3,
    title: "Prevention of Corruption Act, 1988",
    description: "Anti-corruption legislation in India",
    content:
      "The Prevention of Corruption Act, 1988 is an Act of the Parliament of India enacted to combat corruption in government agencies and public sector businesses in India. This law defines public servants and punishes public servants involved in corruption or bribery. The Act was amended in 2018 to bring it in line with the United Nations Convention Against Corruption (UNCAC).",
    type: "Act",
    date: "2025-01-25T09:15:00Z",
  },
  {
    id: 4,
    title: "IPC Section 375",
    description: "Definition of rape under Indian Penal Code",
    content:
      "Section 375 of the Indian Penal Code defines rape as sexual intercourse with a woman against her will, without her consent, by coercion, misrepresentation or fraud or at a time when she has been intoxicated or duped, or is of unsound mental health and in any case if she is under 18 years of age. The Criminal Law (Amendment) Act, 2013 expanded the definition of rape to include oral sex as well as the insertion of an object or any other body part into a woman's vagina, urethra or anus.",
    type: "IPC",
    date: "2025-01-30T14:20:00Z",
  },
  {
    id: 5,
    title: "Transfer of Property Act, 1882",
    description: "Law regulating the transfer of property in India",
    content:
      "The Transfer of Property Act, 1882 is an Indian legislation which regulates the transfer of property in India. It contains specific provisions regarding matters like transfer of property through sale, mortgage, lease, exchange, gift, etc. The Act provides a clear definition of various terms related to property transfer and lays down the procedure for such transfers.",
    type: "Act",
    date: "2025-02-05T11:10:00Z",
  },
]

