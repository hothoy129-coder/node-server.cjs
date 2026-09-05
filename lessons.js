/*
 * Original connected practice lessons for Klar.
 * These editorial level assignments are not an official Goethe syllabus or exam.
 * words contains zero-based indexes into the corresponding UNITS entry only.
 */
const LESSONS = {
  'a1-cafe': {
    title: ['一杯咖啡，从开口到结账', 'A coffee, from ordering to paying'],
    intro: ['Nina 在咖啡馆点一杯加奶咖啡，问价格并结账。先听句子，再试着扮演顾客。', 'Nina orders a coffee with milk, asks the price and pays. Listen first, then try playing the customer.'],
    lines: [
      { speaker: 'Nina', de: 'Guten Tag, ich möchte einen Kaffee mit Milch, bitte.', zh: '您好，我想要一杯加牛奶的咖啡，谢谢。', en: 'Hello, I would like a coffee with milk, please.', words: [0, 2] },
      { speaker: 'Barista', de: 'Möchten Sie auch etwas zu essen bestellen?', zh: '您还想点些吃的吗？', en: 'Would you also like to order something to eat?', words: [1] },
      { speaker: 'Nina', de: 'Nein, danke. Was kostet der Kaffee?', zh: '不用了，谢谢。咖啡多少钱？', en: 'No, thank you. How much is the coffee?', words: [0] },
      { speaker: 'Barista', de: 'Der Kaffee kostet drei Euro.', zh: '咖啡三欧元。', en: 'The coffee costs three euros.', words: [0] },
      { speaker: 'Nina', de: 'Kann ich mit Karte bezahlen?', zh: '我可以刷卡付款吗？', en: 'Can I pay by card?', words: [3] },
      { speaker: 'Barista', de: 'Ja, Sie können hier mit Karte bezahlen.', zh: '可以，您可以在这里刷卡付款。', en: 'Yes, you can pay by card here.', words: [3] }
    ],
    grammar: {
      title: ['礼貌点单：möchte + 第四格', 'Polite orders: möchte + accusative'],
      rule: ['用 ich möchte 表达“我想要”，语气礼貌。点单时名词作直接宾语，用第四格：der Kaffee → einen Kaffee，die Suppe → eine Suppe，das Wasser → ein Wasser。注意：mit 后用第三格；固定搭配 mit Milch 表示“加牛奶”。', 'Use ich möchte for a polite “I would like.” The thing you order is a direct object in the accusative: der Kaffee → einen Kaffee, die Suppe → eine Suppe, das Wasser → ein Wasser. Mit takes the dative; the phrase mit Milch means “with milk.”'],
      pattern: 'Ich möchte + einen / eine / ein + Nomen, bitte.',
      examples: [
        ['Ich möchte einen Tee, bitte.', '我想要一杯茶，谢谢。', 'I would like a tea, please.'],
        ['Ich möchte ein Wasser und eine Suppe.', '我想要一杯水和一份汤。', 'I would like a water and a soup.']
      ],
      pitfall: ['不要说 Ich möchte ein Kaffee：Kaffee 是阳性，在这里要用 einen。ich 对应 möchte，不是 möchten。', 'Do not say Ich möchte ein Kaffee: Kaffee is masculine and needs einen here. With ich, use möchte, not möchten.'],
      task: ['你想要一杯加牛奶的茶，然后询问能否刷卡。请说两句话。', 'Order a tea with milk, then ask whether you can pay by card. Use two sentences.'],
      answer: 'Ich möchte einen Tee mit Milch, bitte. Kann ich mit Karte bezahlen?'
    },
    check: {
      prompt: ['Nina 最后询问什么？', 'What does Nina ask at the end?'],
      options: [['能否刷卡付款', 'Whether she can pay by card'], ['是否有燕麦奶', 'Whether oat milk is available'], ['咖啡馆几点关门', 'What time the café closes']],
      correct: 0,
      explanation: ['mit Karte bezahlen 表示“刷卡付款”。店员确认可以在这里刷卡。', 'Mit Karte bezahlen means “pay by card.” The barista confirms that she can pay by card here.']
    },
    oral: ['你是顾客：打招呼，点一杯饮品，问价格，再询问付款方式。试着不看原文完成四个步骤。', 'You are the customer: greet the barista, order a drink, ask the price and ask about payment. Try all four steps without looking at the text.'],
    rubric: [['我用 möchte 礼貌点单。', 'I order politely with möchte.'], ['我注意了 einen / eine / ein。', 'I choose einen / eine / ein carefully.'], ['我能询问价格和付款方式。', 'I can ask about price and payment.']]
  },
  'a1-food': {
    title: ['一份不含肉的午餐', 'A lunch without meat'],
    intro: ['Alex 在餐厅要菜单、点午餐，并在用餐后要账单。留意问题的词序，以及 kein 和 ohne 的含义。', 'Alex asks for a menu, orders lunch and requests the bill after the meal. Notice question word order and the meanings of kein and ohne.'],
    lines: [
      { speaker: 'Alex', de: 'Haben Sie eine Speisekarte auf Englisch?', zh: '您有英文菜单吗？', en: 'Do you have a menu in English?', words: [0] },
      { speaker: 'Service', de: 'Ja, hier bitte.', zh: '有，给您。', en: 'Yes, here you are.', words: [] },
      { speaker: 'Alex', de: 'Ist in der Gemüsesuppe Fleisch?', zh: '蔬菜汤里有肉吗？', en: 'Is there meat in the vegetable soup?', words: [] },
      { speaker: 'Service', de: 'Nein, sie hat kein Fleisch und ist sehr lecker.', zh: '没有，这汤不含肉，而且很好喝。', en: 'No, it contains no meat and is very delicious.', words: [3] },
      { speaker: 'Alex', de: 'Dann nehme ich die Suppe und ein Wasser ohne Kohlensäure.', zh: '那我要这份汤和一杯不含气的水。', en: 'Then I will have the soup and a still water.', words: [1] },
      { speaker: 'Alex', de: 'Kann ich bitte die Rechnung haben?', zh: '请把账单给我，好吗？', en: 'Could I have the bill, please?', words: [2] }
    ],
    grammar: {
      title: ['提问与否定：Fragen, kein, nicht', 'Questions and negatives: kein and nicht'],
      rule: ['是非问句把变位动词放第一位：Haben Sie …? 疑问词问句先放疑问词，再放动词：Was möchten Sie? 否定带不定冠词或不带冠词的名词常用 kein；否定形容词或其他内容常用 nicht。ohne + 名词表示“不带／没有”，后接第四格。', 'In yes/no questions, put the conjugated verb first: Haben Sie …? In a question with a question word, put the verb next: Was möchten Sie? Use kein to negate nouns with an indefinite article or no article. Use nicht to negate adjectives or other elements. Ohne + a noun means “without” and takes the accusative.'],
      pattern: 'Haben Sie + …? / Was + Verb + …? / kein Fleisch / nicht teuer',
      examples: [
        ['Ist in der Suppe Fleisch? — Nein, die Suppe hat kein Fleisch.', '汤里有肉吗？——没有，这汤不含肉。', 'Is there meat in the soup? — No, the soup contains no meat.'],
        ['Wie ist die Suppe? — Sie ist lecker und nicht teuer.', '这汤怎么样？——很好喝，而且不贵。', 'How is the soup? — It is delicious and not expensive.']
      ],
      pitfall: ['否定形容词 teuer 要用 nicht teuer，不是 kein teuer。kein 需要配合名词：kein Fleisch、keine Milch。', 'Negate the adjective teuer with nicht teuer, not kein teuer. Kein accompanies a noun: kein Fleisch, keine Milch.'],
      task: ['问汤里是否有肉，然后回答“没有，这汤不含肉”。', 'Ask whether the soup contains meat, then answer “No, the soup contains no meat.”'],
      answer: 'Ist in der Suppe Fleisch? Nein, die Suppe hat kein Fleisch.'
    },
    check: {
      prompt: ['Alex 点了哪种水？', 'What kind of water does Alex order?'],
      options: [['含气的水', 'Sparkling water'], ['不含气的水', 'Still water'], ['加柠檬的水', 'Water with lemon']],
      correct: 1,
      explanation: ['ohne Kohlensäure 表示“不含碳酸气”，即不含气的水；mit Kohlensäure 才是含气的水。', 'Ohne Kohlensäure means “without carbonation,” or still water. Mit Kohlensäure means sparkling water.']
    },
    oral: ['你在餐厅：要一份菜单，问一道菜是否含肉，点菜和饮品，最后要账单。可使用对话中的词，也可以换成自己喜欢的食物。', 'At a restaurant, ask for a menu, ask whether a dish contains meat, order food and a drink, then request the bill. Use the dialogue vocabulary or your own food choices.'],
    rubric: [['我的问句中动词位置正确。', 'My questions use the correct verb position.'], ['我能用 kein 否定一个名词。', 'I can negate a noun with kein.'], ['我能清楚说明想要的饮品。', 'I can clearly specify the drink I want.']]
  },
  'a2-home': {
    title: ['约好周五的看房时间', 'Arranging a Friday viewing'],
    intro: ['Mara 给房东打电话，了解租金并约看房。练习用情态动词说明需求、许可和必要事项。', 'Mara calls the landlord to ask about rent and arrange a viewing. Practise modal verbs for needs, permission and requirements.'],
    lines: [
      { speaker: 'Mara', de: 'Ich suche eine Wohnung für zwei Personen.', zh: '我在找一套供两个人居住的公寓。', en: 'I am looking for an apartment for two people.', words: [0] },
      { speaker: 'Vermieter', de: 'Sie können unsere Wohnung am Freitag besichtigen.', zh: '您可以周五来看我们的公寓。', en: 'You can view our apartment on Friday.', words: [0, 2] },
      { speaker: 'Mara', de: 'Wie hoch ist die Miete?', zh: '租金是多少？', en: 'How much is the rent?', words: [1] },
      { speaker: 'Vermieter', de: 'Die Miete beträgt 850 Euro im Monat, und Strom müssen Sie extra bezahlen.', zh: '租金每月 850 欧元，电费您需要另付。', en: 'The rent is 850 euros per month, and you have to pay for electricity separately.', words: [1] },
      { speaker: 'Mara', de: 'Könnten wir einen Termin um 17 Uhr vereinbaren?', zh: '我们能约在 17 点吗？', en: 'Could we arrange an appointment at 5 p.m.?', words: [3] },
      { speaker: 'Vermieter', de: 'Ja, Sie können um 17 Uhr kommen.', zh: '可以，您可以 17 点过来。', en: 'Yes, you can come at 5 p.m.', words: [] }
    ],
    grammar: {
      title: ['看房请求：情态动词与句末原形', 'Viewing requests: modals and final infinitives'],
      rule: ['陈述句中，变位的情态动词通常在第二位，实义动词原形放句末：Ich muss die Miete bezahlen。können 表示能够或许可，müssen 表示必须。问句将情态动词放第一位；könnten 比 können 更委婉。', 'In statements, the conjugated modal normally occupies position two, and the main verb stays in the infinitive at the end: Ich muss die Miete bezahlen. Können expresses ability or permission; müssen expresses necessity. Put the modal first in a yes/no question. Könnten is more polite than können.'],
      pattern: 'Subjekt + Modalverb + … + Infinitiv. / Könnten wir + … + Infinitiv?',
      examples: [
        ['Könnten wir die Wohnung morgen besichtigen?', '我们明天能看一下这套公寓吗？', 'Could we view the apartment tomorrow?'],
        ['Ich muss den Strom extra bezahlen.', '我必须另外支付电费。', 'I have to pay for electricity separately.']
      ],
      pitfall: ['一个简单句中不要把两个动词都变位：Ich kann kommen，而不是 Ich kann komme。müssen nicht 意思是“不必”，不是“禁止”。', 'Do not conjugate both verbs in a simple clause: Ich kann kommen, not Ich kann komme. Nicht müssen means “not have to,” not “must not.”'],
      task: ['用一句委婉的问句，询问周五 17 点是否可以看房。', 'Use one polite question to ask whether you can view the apartment on Friday at 5 p.m.'],
      answer: 'Könnten wir die Wohnung am Freitag um 17 Uhr besichtigen?'
    },
    check: {
      prompt: ['关于费用，房东明确说了什么？', 'What does the landlord explicitly say about the costs?'],
      options: [['所有费用都已包含', 'All costs are included'], ['每月电费为 850 欧元', 'Electricity costs 850 euros per month'], ['月租 850 欧元，电费另付', 'Rent is 850 euros per month; electricity is extra']],
      correct: 2,
      explanation: ['850 Euro im Monat 说的是租金。Strom müssen Sie extra bezahlen 表明电费需要另付；对话没有说明其他费用。', '850 Euro im Monat refers to the rent. Strom müssen Sie extra bezahlen states that electricity is extra. The dialogue does not specify other costs.']
    },
    oral: ['给房东留言：说明你在找怎样的住房，询问租金，并提议一个具体的看房时间。至少使用一次 können、könnten 或 müssen。', 'Leave the landlord a message: describe the home you need, ask about the rent and suggest a specific viewing time. Use können, könnten or müssen at least once.'],
    rubric: [['我把实义动词原形放在句末。', 'I put the main infinitive at the end.'], ['我清楚表达日期和时间。', 'I state the date and time clearly.'], ['我区分租金与额外费用。', 'I distinguish rent from additional costs.']]
  },
  'a2-move': {
    title: ['搬家后的第一段对话', 'The first conversation after moving'],
    intro: ['Tim 问 Lea 周末搬家的情况。用完成时回顾取钥匙、签合同和邻居帮忙的经过。', 'Tim asks Lea about her weekend move. Use the perfect tense to describe collecting the key, signing the contract and getting help from a neighbour.'],
    lines: [
      { speaker: 'Tim', de: 'Bist du am Wochenende umgezogen?', zh: '你周末搬家了吗？', en: 'Did you move house at the weekend?', words: [1] },
      { speaker: 'Lea', de: 'Ja, ich bin am Samstag in die neue Wohnung eingezogen.', zh: '是的，我周六搬进了新公寓。', en: 'Yes, I moved into the new apartment on Saturday.', words: [] },
      { speaker: 'Tim', de: 'Hast du den Schlüssel schon abgeholt?', zh: '你已经取到钥匙了吗？', en: 'Have you collected the key yet?', words: [0] },
      { speaker: 'Lea', de: 'Ja, ich habe ihn am Freitag abgeholt und den Vertrag unterschrieben.', zh: '是的，我周五取了钥匙，还签了合同。', en: 'Yes, I collected it on Friday and signed the contract.', words: [3] },
      { speaker: 'Tim', de: 'Wer hat dir beim Auspacken geholfen?', zh: '谁帮你拆箱整理了？', en: 'Who helped you unpack?', words: [] },
      { speaker: 'Lea', de: 'Mein Nachbar hat mir geholfen und mich zum Kaffee eingeladen.', zh: '我的邻居帮了我，还邀请我去喝咖啡。', en: 'My neighbour helped me and invited me for coffee.', words: [2] }
    ],
    grammar: {
      title: ['搬家回顾：可分动词的完成时', 'Moving recap: separable verbs in the perfect'],
      rule: ['完成时由 haben 或 sein 的变位形式加第二分词组成。可分动词的 ge 通常放在前缀和词干之间：abholen → abgeholt，einziehen → eingezogen。表示搬家或搬入的 umziehen、einziehen 在完成时用 sein；abholen 用 haben。第二分词放句末。', 'The perfect uses a conjugated form of haben or sein plus the past participle. With separable verbs, ge usually goes between the prefix and the stem: abholen → abgeholt, einziehen → eingezogen. Umziehen meaning “move house” and einziehen meaning “move in” take sein; abholen takes haben. The participle goes at the end.'],
      pattern: 'Ich bin + … + umgezogen. / Ich habe + … + abgeholt.',
      examples: [
        ['Wir sind letzte Woche umgezogen.', '我们上周搬家了。', 'We moved house last week.'],
        ['Ich habe den Schlüssel gestern abgeholt.', '我昨天取了钥匙。', 'I collected the key yesterday.']
      ],
      pitfall: ['“我搬家了”是 Ich bin umgezogen，不是 Ich habe umgezogen。sich umziehen 表示“换衣服”，才说 Ich habe mich umgezogen。不要写 geabholt，应为 abgeholt。', '“I moved house” is Ich bin umgezogen, not Ich habe umgezogen. Sich umziehen means “change clothes”: Ich habe mich umgezogen. Write abgeholt, not geabholt.'],
      task: ['用两句话说明：你周五取了钥匙，周六搬家了。', 'Use two sentences to say that you collected the key on Friday and moved house on Saturday.'],
      answer: 'Ich habe den Schlüssel am Freitag abgeholt. Ich bin am Samstag umgezogen.'
    },
    check: {
      prompt: ['Lea 什么时候取的钥匙？', 'When did Lea collect the key?'],
      options: [['周六', 'On Saturday'], ['周五', 'On Friday'], ['对话没有提到', 'The dialogue does not say']],
      correct: 1,
      explanation: ['Lea 说 ich habe ihn am Freitag abgeholt，其中 ihn 指代阳性名词 der Schlüssel。她周六才搬入。', 'Lea says ich habe ihn am Freitag abgeholt. Ihn refers to the masculine noun der Schlüssel. She moved in on Saturday.']
    },
    oral: ['向朋友讲述一次真实或想象的搬家：什么时候取钥匙、什么时候搬入、谁帮了忙。用完成时说三到四句话。', 'Tell a friend about a real or imagined move: when you collected the key, when you moved in and who helped. Use three or four sentences in the perfect tense.'],
    rubric: [['我为“搬家”选择 sein。', 'I use sein for moving house.'], ['我的可分动词第二分词形式正确。', 'I form separable past participles correctly.'], ['我用日期或时间词说明先后顺序。', 'I use dates or time expressions to show the sequence.']]
  },
  'b1-apply': {
    title: ['把求职动机说清楚', 'Explaining why you are applying'],
    intro: ['招聘人员和 Sam 进行一段简短交流。将申请、经验和个人优势连成有理由的表达。', 'A recruiter has a short conversation with Sam. Connect your application, experience and strengths with clear reasons.'],
    lines: [
      { speaker: 'Recruiterin', de: 'Warum bewerben Sie sich um diese Stelle?', zh: '您为什么申请这个职位？', en: 'Why are you applying for this position?', words: [0] },
      { speaker: 'Sam', de: 'Ich bewerbe mich, weil ich gern mit Menschen arbeite und Erfahrung im Kundenservice habe.', zh: '我申请是因为我喜欢与人打交道，而且有客服方面的经验。', en: 'I am applying because I enjoy working with people and have experience in customer service.', words: [0, 1] },
      { speaker: 'Recruiterin', de: 'Welche Aufgabe hat Ihnen bisher besonders gut gefallen?', zh: '到目前为止，您特别喜欢哪项工作任务？', en: 'Which task have you particularly enjoyed so far?', words: [] },
      { speaker: 'Sam', de: 'In meinem letzten Team war ich für Kundenanfragen zuständig, und meine Kolleginnen fanden, dass ich zuverlässig bin.', zh: '在上一个团队中，我负责处理客户咨询，女同事们认为我很可靠。', en: 'In my last team, I was responsible for customer enquiries, and my female colleagues thought that I was reliable.', words: [3] },
      { speaker: 'Recruiterin', de: 'Könnten Sie uns Ihren Lebenslauf per E-Mail schicken?', zh: '您能通过电子邮件把简历发给我们吗？', en: 'Could you email us your CV?', words: [2] },
      { speaker: 'Sam', de: 'Gern, ich hoffe, dass wir bald wieder miteinander sprechen.', zh: '当然，我希望我们很快能再次交流。', en: 'Of course; I hope that we will speak again soon.', words: [] }
    ],
    grammar: {
      title: ['求职理由与内容：weil 和 dass', 'Reasons and reported content: weil and dass'],
      rule: ['weil 引出原因，dass 引出某人希望、认为或知道的内容。两者都引导从句：变位动词放末尾，主从句间加逗号。同一从句里用 und 连接两个谓语时，两个变位动词都可以在各自部分末尾：weil ich gern arbeite und Erfahrung habe。', 'Weil introduces a reason. Dass introduces what someone hopes, thinks or knows. Both introduce subordinate clauses: put the conjugated verb at the end and separate the clause with a comma. When und joins two predicates within the clause, each conjugated verb can close its own part: weil ich gern arbeite und Erfahrung habe.'],
      pattern: 'Ich bewerbe mich, weil + … + Verb. / Ich hoffe, dass + … + Verb.',
      examples: [
        ['Ich bewerbe mich, weil ich Erfahrung im Verkauf habe.', '我申请是因为我有销售经验。', 'I am applying because I have experience in sales.'],
        ['Ich hoffe, dass Sie meinen Lebenslauf erhalten haben.', '我希望您已经收到我的简历。', 'I hope that you have received my CV.']
      ],
      pitfall: ['不要照搬主句词序：weil ich habe Erfahrung 不正确，应为 weil ich Erfahrung habe。dass 从句用完成时时，助动词最后：dass Sie … erhalten haben。', 'Do not copy main-clause order: use weil ich Erfahrung habe, not weil ich habe Erfahrung. In a dass clause in the perfect, the auxiliary goes last: dass Sie … erhalten haben.'],
      task: ['写两句申请邮件：说明你因为有客服经验而申请，并希望能获得面试机会。分别使用 weil 和 dass。', 'Write two sentences for an application email: say that you are applying because you have customer-service experience, and that you hope for an interview. Use weil and dass respectively.'],
      answer: 'Ich bewerbe mich, weil ich Erfahrung im Kundenservice habe. Ich hoffe, dass Sie mich zu einem Vorstellungsgespräch einladen.'
    },
    check: {
      prompt: ['Sam 提出了哪些申请理由？', 'Which reasons does Sam give for applying?'],
      options: [['喜欢与人打交道，并有客服经验', 'Enjoying work with people and having customer-service experience'], ['希望减少工作时间，并住得更近', 'Wanting fewer working hours and a shorter commute'], ['已在这家公司工作多年', 'Having worked at this company for many years']],
      correct: 0,
      explanation: ['weil 后的两个理由是 gern mit Menschen arbeite 和 Erfahrung im Kundenservice habe。其他选项在对话中没有出现。', 'The two reasons after weil are gern mit Menschen arbeite and Erfahrung im Kundenservice habe. The other options are not mentioned in the dialogue.']
    },
    oral: ['录制一段约 45 秒的求职自我介绍：想申请什么职位、有什么相关经验、能为团队带来什么。至少用一次 weil 和一次 dass；可使用虚构经历。', 'Record an approximately 45-second application introduction: name the position, describe relevant experience and explain what you can offer the team. Use weil and dass at least once each. Invented experience is fine for this practice.'],
    rubric: [['我的动机有具体理由或例子。', 'I support my motivation with a specific reason or example.'], ['weil 和 dass 从句的动词在末尾。', 'My weil and dass clauses put the verb at the end.'], ['我的经历与申请职位相关。', 'My experience is relevant to the position.']]
  },
  'b1-work': {
    title: ['礼貌改期，也给出方案', 'Rescheduling politely with an alternative'],
    intro: ['Jana 需要改会议时间，向同事说明情况并商定新安排。练习温和但明确的职场请求。', 'Jana needs to move a meeting, explains the situation and agrees on a new arrangement with a colleague. Practise polite but clear workplace requests.'],
    lines: [
      { speaker: 'Jana', de: 'Könnten wir die Besprechung auf morgen verschieben?', zh: '我们能把会议改到明天吗？', en: 'Could we reschedule the meeting for tomorrow?', words: [0, 1] },
      { speaker: 'Herr Weber', de: 'Würde Ihnen morgen um zehn Uhr passen?', zh: '明天十点您方便吗？', en: 'Would tomorrow at ten suit you?', words: [] },
      { speaker: 'Jana', de: 'Ja, dann könnte ich die Aufgabe vorher fertigstellen.', zh: '方便，那我就能在会议前完成这项任务。', en: 'Yes, then I could finish the task beforehand.', words: [2] },
      { speaker: 'Herr Weber', de: 'Welche Informationen brauchen Sie noch für die Aufgabe?', zh: '这项任务您还需要哪些信息？', en: 'What information do you still need for the task?', words: [2] },
      { speaker: 'Jana', de: 'Würden Sie mir bitte die aktuellen Zahlen schicken?', zh: '您能把最新的数据发给我吗？', en: 'Would you please send me the latest figures?', words: [] },
      { speaker: 'Herr Weber', de: 'Gern, dann vereinbaren wir morgen zehn Uhr als neuen Termin.', zh: '当然，那我们就把明天十点定为新的会议时间。', en: 'Of course; then let us agree on tomorrow at ten as the new time.', words: [3] }
    ],
    grammar: {
      title: ['委婉协商：könnten 与 würden', 'Polite negotiation: könnten and würden'],
      rule: ['第二虚拟式可以让请求更委婉，不一定表示过去。könnten 后接动词原形；würden 后也接动词原形。注意主语一致：Würde Ihnen morgen passen? 的主语是时间表达 morgen，所以用 würde；Würden Sie mir helfen? 的主语是礼貌称呼 Sie，所以用 würden。', 'The subjunctive II makes requests more polite; it does not necessarily refer to the past. Könnten and würden are followed by an infinitive. Match the verb to the subject: in Würde Ihnen morgen passen?, the time expression morgen is the subject, so use würde. In Würden Sie mir helfen?, formal Sie is the subject, so use würden.'],
      pattern: 'Könnten wir + … + Infinitiv? / Würden Sie + … + Infinitiv?',
      examples: [
        ['Könnten wir die Besprechung auf Dienstag verschieben?', '我们能把会议改到周二吗？', 'Could we reschedule the meeting for Tuesday?'],
        ['Würden Sie mir bitte die Unterlagen schicken?', '您能把资料发给我吗？', 'Would you please send me the documents?']
      ],
      pitfall: ['不要把 würden 和 könnten 当作必须同时出现的一组：请求中说 Könnten Sie mir helfen? 或 Würden Sie mir helfen? 即可。注意 verschieben auf + 第四格表示“改到某个时间”。', 'Do not treat würden and könnten as a required pair: Könnten Sie mir helfen? or Würden Sie mir helfen? is enough. Verschieben auf + accusative means rescheduling for a particular time.'],
      task: ['礼貌提议把会议改到周五，再请求同事把资料发给你。使用两种不同的委婉句式。', 'Politely suggest moving the meeting to Friday, then ask your colleague to send the documents. Use two different polite constructions.'],
      answer: 'Könnten wir die Besprechung auf Freitag verschieben? Würden Sie mir bitte die Unterlagen schicken?'
    },
    check: {
      prompt: ['他们最后约定的新时间是什么？', 'What new time do they finally agree on?'],
      options: [['今天十点', 'Today at ten'], ['明天十点', 'Tomorrow at ten'], ['周五九点', 'Friday at nine']],
      correct: 1,
      explanation: ['Herr Weber 最后说 morgen zehn Uhr als neuen Termin，明确确认了明天十点。', 'Herr Weber closes with morgen zehn Uhr als neuen Termin, explicitly confirming tomorrow at ten.']
    },
    oral: ['模拟给同事打电话：提出改期，给出一个简短理由，建议新时间，并确认接下来谁做什么。用 könnten 或 würden 表达至少一个请求。', 'Role-play a call to a colleague: request a change, give a short reason, suggest a new time and confirm who will do what next. Make at least one request with könnten or würden.'],
    rubric: [['我的请求礼貌且明确。', 'My request is polite and specific.'], ['我提供了可执行的新时间。', 'I offer a concrete alternative time.'], ['我确认了下一步安排。', 'I confirm the next steps.']]
  },
  'b2-city': {
    title: ['中心地段，还是更低房租？', 'A central location or lower rent?'],
    intro: ['两位朋友比较市中心和郊区的住房选择。识别让步关系，练习在承认缺点的同时解释个人取舍。', 'Two friends compare housing in the centre and the outskirts. Identify concessions and explain personal choices while acknowledging disadvantages.'],
    lines: [
      { speaker: 'Mina', de: 'Obwohl die Wohnung im Zentrum klein ist, spricht die gute Anbindung für sie.', zh: '虽然市中心这套公寓很小，但便利的交通是它的优势。', en: 'Although the apartment in the centre is small, its good transport connections count in its favour.', words: [1] },
      { speaker: 'Jonas', de: 'Die Wohnung am Stadtrand ist dagegen bezahlbar und hat einen Balkon.', zh: '相比之下，郊区那套公寓价格负担得起，而且有一个阳台。', en: 'The apartment on the outskirts, by contrast, is affordable and has a balcony.', words: [3] },
      { speaker: 'Mina', de: 'Dort müsste ich allerdings jeden Tag länger pendeln, was meine Lebensqualität beeinträchtigen könnte.', zh: '不过，住在那里我每天都得花更长时间通勤，这可能影响我的生活质量。', en: 'However, I would have to commute longer every day there, which could affect my quality of life.', words: [0] },
      { speaker: 'Jonas', de: 'Die längere Fahrt ist ein Nachteil, trotzdem würde ich die zusätzliche Ruhe nicht unterschätzen.', zh: '更长的通勤是个缺点，不过我也不会低估那里更加安静的好处。', en: 'The longer journey is a disadvantage; nevertheless, I would not underestimate the extra peace and quiet.', words: [] },
      { speaker: 'Mina', de: 'Wir sollten also nicht nur die Miete vergleichen, sondern auch Zeit, Platz und Erholung gegeneinander abwägen.', zh: '所以我们不应该只比较租金，还应该把时间、空间和休息条件一起权衡。', en: 'So we should not only compare rents, but also weigh up time, space and opportunities to relax.', words: [2] },
      { speaker: 'Jonas', de: 'Obwohl keine Lösung perfekt ist, können wir so eine Entscheidung treffen, die zu unserem Alltag passt.', zh: '虽然没有完美的方案，但这样我们可以做出适合日常生活的决定。', en: 'Although neither solution is perfect, this way we can make a decision that suits our everyday life.', words: [] }
    ],
    grammar: {
      title: ['承认缺点：obwohl 与 trotzdem', 'Acknowledging drawbacks: obwohl and trotzdem'],
      rule: ['obwohl 引导让步从句，变位动词放末尾。如果从句在前，整个从句占主句的第一位，因此主句紧接变位动词。trotzdem 是连接副词，不引导动词后置从句；它在主句第一位时，动词仍在第二位。', 'Obwohl introduces a concessive subordinate clause with the conjugated verb at the end. If this clause comes first, it occupies the first position of the main clause, so the main clause starts with its conjugated verb. Trotzdem is a linking adverb, not a subordinating conjunction; if it takes position one, the main-clause verb remains in position two.'],
      pattern: 'Obwohl + … + Verb, Verb + Subjekt + … . / … . Trotzdem + Verb + Subjekt + … .',
      examples: [
        ['Obwohl die Miete hoch ist, bietet die Wohnung eine gute Anbindung.', '虽然租金高，这套公寓的交通却很便利。', 'Although the rent is high, the apartment offers good transport connections.'],
        ['Die Wohnung liegt am Stadtrand. Trotzdem ist der Arbeitsweg kurz.', '这套公寓位于郊区，但上班路程仍然很短。', 'The apartment is on the outskirts. Nevertheless, the journey to work is short.']
      ],
      pitfall: ['不要说 Trotzdem der Arbeitsweg kurz ist。trotzdem 后要用主句词序：Trotzdem ist der Arbeitsweg kurz。obwohl 从句在前时，也不要漏掉主句的倒装。', 'Do not say Trotzdem der Arbeitsweg kurz ist. Use main-clause order: Trotzdem ist der Arbeitsweg kurz. After an initial obwohl clause, also remember that the main-clause verb precedes its subject.'],
      task: ['分别用 obwohl 和 trotzdem 表达同一个取舍：租金高，但你仍然选择这套公寓。', 'Express the same trade-off once with obwohl and once with trotzdem: the rent is high, but you still choose the apartment.'],
      answer: 'Obwohl die Miete hoch ist, entscheide ich mich für diese Wohnung. Die Miete ist hoch. Trotzdem entscheide ich mich für diese Wohnung.'
    },
    check: {
      prompt: ['Mina 为什么对郊区公寓有所保留？', 'Why does Mina have reservations about the apartment on the outskirts?'],
      options: [['它没有阳台', 'It has no balcony'], ['它比中心公寓更贵', 'It is more expensive than the central apartment'], ['更长的通勤可能影响生活质量', 'The longer commute could affect her quality of life']],
      correct: 2,
      explanation: ['Mina 指出每天需要更长时间通勤，并用 könnte 表达对生活质量的可能影响；她并未断言这种影响一定发生。', 'Mina points to the longer daily commute and uses könnte to describe a possible effect on quality of life; she does not claim that the effect is certain.']
    },
    oral: ['用约一分钟比较两种居住选择：分别说出优缺点，承认一个与你最终选择相反的理由，再解释你的决定。至少使用一次 obwohl 或 trotzdem。', 'Compare two housing options for about one minute: explain the pros and cons, acknowledge one argument against your final choice and justify your decision. Use obwohl or trotzdem at least once.'],
    rubric: [['我比较了不止一个维度。', 'I compare more than one aspect.'], ['我准确表达让步关系与词序。', 'I express concession with accurate word order.'], ['我的结论回应了个人实际需求。', 'My conclusion addresses practical personal needs.']]
  },
  'b2-debate': {
    title: ['回应观点，不只说“我不同意”', 'Responding with more than “I disagree”'],
    intro: ['围绕城市中心的新住房项目，两位参与者交换意见。练习复述对方观点、补充理由并提出有条件的结论。', 'Two participants discuss a new housing project in the city centre. Practise acknowledging another view, adding reasons and reaching a qualified conclusion.'],
    lines: [
      { speaker: 'Lara', de: 'Mein Standpunkt ist, dass die Stadt mehr bezahlbare Wohnungen im Zentrum schaffen sollte.', zh: '我的观点是，市政府应该在市中心增加更多价格可负担的住房。', en: 'My view is that the city should create more affordable housing in the centre.', words: [0] },
      { speaker: 'David', de: 'Einerseits könnte das viele Menschen entlasten, andererseits müsste man die Auswirkungen auf Schulen und Verkehr berücksichtigen.', zh: '一方面，这能减轻很多人的负担；另一方面，也必须考虑对学校和交通的影响。', en: 'On the one hand, that could ease the burden on many people; on the other, the effects on schools and transport would need to be taken into account.', words: [2, 3] },
      { speaker: 'Lara', de: 'Dieser Einwand überzeugt mich, deshalb sollten zusätzliche Busverbindungen von Anfang an eingeplant werden.', zh: '这个反对意见说服了我，因此一开始就应该把新增公交线路纳入规划。', en: 'That objection convinces me, so additional bus services should be planned from the outset.', words: [1] },
      { speaker: 'David', de: 'Außerdem sollte die Stadt erklären, wie neue Schulplätze finanziert werden.', zh: '此外，市政府应该说明如何为新增学位提供资金。', en: 'In addition, the city should explain how additional school places will be funded.', words: [] },
      { speaker: 'Lara', de: 'Zwar kostet eine solche Planung zunächst Geld, aber langfristig könnten mehr Menschen näher an ihrem Arbeitsplatz wohnen.', zh: '这样的规划起初确实需要花钱，但长期来看，更多人可以住得离工作地点更近。', en: 'Such planning does cost money initially, but in the long term more people could live closer to their workplace.', words: [] },
      { speaker: 'David', de: 'Unter diesen Bedingungen könnte ich den Vorschlag unterstützen, sofern die Stadt die zusätzlichen Kosten offenlegt.', zh: '在这些条件下，只要市政府公开额外成本，我就可以支持这个提议。', en: 'Under those conditions, I could support the proposal, provided that the city discloses the additional costs.', words: [] }
    ],
    grammar: {
      title: ['组织论证：两面、补充与结论', 'Structuring arguments: contrast, addition and conclusion'],
      rule: ['einerseits … andererseits … 展示两面；außerdem 补充论据；deshalb 引出结果或结论。这些副词占主句第一位时，变位动词紧随其后。zwar … aber … 先承认一点，再加以转折；aber 本身不占主句的句子成分位置。', 'Einerseits … andererseits … presents two sides; außerdem adds a point; deshalb introduces a consequence or conclusion. When these adverbs take position one in a main clause, the conjugated verb follows. Zwar … aber … acknowledges a point before qualifying it; aber itself does not occupy a sentence-element position in the main clause.'],
      pattern: 'Einerseits + Verb + …, andererseits + Verb + … . / Außerdem / Deshalb + Verb + … .',
      examples: [
        ['Einerseits brauchen wir neue Wohnungen, andererseits müssen wir die Infrastruktur berücksichtigen.', '一方面我们需要新住房，另一方面必须考虑基础设施。', 'On the one hand we need new housing; on the other we must consider the infrastructure.'],
        ['Zwar ist der Vorschlag teuer, aber er könnte viele Haushalte entlasten.', '这个提议确实成本很高，但它可能减轻许多家庭的负担。', 'The proposal is indeed expensive, but it could ease the burden on many households.']
      ],
      pitfall: ['不要把所有连接词都当作 weil：Deshalb die Stadt sollte … 词序不对，应为 Deshalb sollte die Stadt …。只有存在因果关系时才用 deshalb；补充另一条理由用 außerdem。', 'Do not treat every connector like weil: Deshalb die Stadt sollte … has incorrect word order; use Deshalb sollte die Stadt … . Use deshalb only for a causal consequence; use außerdem to add another reason.'],
      task: ['写一句话，先承认新住房很重要，再指出也必须考虑对交通的影响。使用 einerseits … andererseits …。', 'Write one sentence acknowledging that new housing is important while also noting that its effects on transport must be considered. Use einerseits … andererseits … .'],
      answer: 'Einerseits sind neue Wohnungen wichtig, andererseits müssen wir die Auswirkungen auf den Verkehr berücksichtigen.'
    },
    check: {
      prompt: ['David 最后的立场最准确的是哪一项？', 'Which option best describes David’s final position?'],
      options: [['在附带条件满足时可以支持提议', 'He could support the proposal if the conditions are met'], ['无条件支持所有新建项目', 'He unconditionally supports all new building projects'], ['反对在市中心建设任何住房', 'He opposes all housing construction in the centre']],
      correct: 0,
      explanation: ['könnte ich … unterstützen 和 sofern 表明这是一种有条件的支持，不是全面赞成或全面反对。', 'Könnte ich … unterstützen together with sofern signals conditional support, not blanket approval or rejection.']
    },
    oral: ['讨论“市中心是否应增加可负担住房”：先表明立场，给出两个理由，回应一个反对意见，最后提出一个条件或建议。使用至少三种功能不同的连接表达。', 'Discuss whether the city centre should have more affordable housing: state your position, give two reasons, respond to one objection and finish with a condition or recommendation. Use at least three connectors with different functions.'],
    rubric: [['我的理由、例子与结论相关。', 'My reasons, examples and conclusion are connected.'], ['我回应对方观点，而非只重复自己。', 'I respond to the other view instead of only repeating mine.'], ['连接表达符合实际逻辑，词序正确。', 'My connectors match the logic and use correct word order.']]
  }
};
