'use strict';
/*
 * Two additional A1 situations based on themes and headwords in the supplied
 * Goethe-Zertifikat A1 Wortliste. Definitions, examples, dialogues and
 * exercises are original Klar teaching material.
 */
const A1_OFFICIAL_UNITS = [
  {
    id:'a1-personal', level:'A1', title:['认识新朋友','Meeting someone new'],
    de:'Sich vorstellen', icon:'globe', video:'huwi-cjPPXU',
    videoTitle:'Introduce Yourself in Slow German | Super Easy German 258',
    goal:['介绍姓名、住址、来源、语言、职业与家庭。','Introduce your name, address, origin, languages, work and family.'],
    words:[
      vocabWord('sich vorstellen','自我介绍','to introduce oneself','stellt sich vor · hat sich vorgestellt',[
        ['Darf ich mich kurz vorstellen?','我可以简单自我介绍一下吗？','May I introduce myself briefly?'],
        ['Ich stelle mich am ersten Kurstag vor.','我在课程第一天自我介绍。','I introduce myself on the first day of class.'],
        ['Bitte stellen Sie sich mit zwei Sätzen vor.','请用两句话介绍自己。','Please introduce yourself in two sentences.']]),
      vocabWord('der Name','姓名；名字','name','die Namen · 阳性 / masculine',[
        ['Mein Name ist Li Wei.','我的名字是李伟。','My name is Li Wei.'],
        ['Wie ist Ihr Name?','您叫什么名字？','What is your name?'],
        ['Bitte schreiben Sie Ihren Namen hier.','请把您的姓名写在这里。','Please write your name here.']]),
      vocabWord('der Vorname','名','first name','die Vornamen · 阳性 / masculine',[
        ['Mein Vorname ist Mia.','我的名字是 Mia。','My first name is Mia.'],
        ['Auf dem Formular steht zuerst der Vorname.','表格上先填写名字。','The first name comes first on the form.'],
        ['Wie schreibt man Ihren Vornamen?','您的名字怎么拼写？','How do you spell your first name?']]),
      vocabWord('die Adresse','地址','address','die Adressen · 阴性 / feminine',[
        ['Meine Adresse ist Gartenstraße 12.','我的地址是花园街 12 号。','My address is 12 Gartenstraße.'],
        ['Ist die Adresse noch richtig?','这个地址仍然正确吗？','Is the address still correct?'],
        ['Bitte schicken Sie den Brief an diese Adresse.','请把信寄到这个地址。','Please send the letter to this address.']]),
      vocabWord('wohnen','居住','to live; reside','wohnt · hat gewohnt',[
        ['Ich wohne jetzt in Köln.','我现在住在科隆。','I live in Cologne now.'],
        ['Wo wohnen Sie?','您住在哪里？','Where do you live?'],
        ['Wir wohnen seit Mai zusammen.','我们从五月起住在一起。','We have lived together since May.']]),
      vocabWord('kommen','来自；来','to come; come from','kommt · ist gekommen',[
        ['Ich komme aus China.','我来自中国。','I come from China.'],
        ['Kommst du morgen zum Kurs?','你明天来上课吗？','Are you coming to class tomorrow?'],
        ['Der Bus kommt in fünf Minuten.','公交车五分钟后到。','The bus comes in five minutes.']]),
      vocabWord('sprechen','说；讲（语言）','to speak','spricht · hat gesprochen',[
        ['Ich spreche Chinesisch und etwas Deutsch.','我说中文和一点德语。','I speak Chinese and some German.'],
        ['Sprechen Sie bitte langsamer.','请您说慢一点。','Please speak more slowly.'],
        ['Wir sprechen nach dem Kurs.','我们课后再谈。','We will talk after class.']]),
      vocabWord('der Beruf','职业','profession; occupation','die Berufe · 阳性 / masculine',[
        ['Was sind Sie von Beruf?','您的职业是什么？','What do you do for a living?'],
        ['Mein Beruf macht mir Freude.','我的工作让我感到快乐。','I enjoy my profession.'],
        ['Im Formular fehlt noch Ihr Beruf.','表格上还缺少您的职业。','Your occupation is still missing on the form.']]),
      vocabWord('die Familie','家庭；家人','family','die Familien · 阴性 / feminine',[
        ['Meine Familie lebt in Shanghai.','我的家人住在上海。','My family lives in Shanghai.'],
        ['Am Sonntag besuche ich meine Familie.','周日我去看家人。','I visit my family on Sunday.'],
        ['Haben Sie Familie in Deutschland?','您在德国有家人吗？','Do you have family in Germany?']]),
      vocabWord('verheiratet','已婚的','married','形容词 / adjective',[
        ['Ich bin verheiratet.','我已婚。','I am married.'],
        ['Sind Sie verheiratet oder ledig?','您已婚还是单身？','Are you married or single?'],
        ['Meine Schwester ist seit einem Jahr verheiratet.','我姐姐结婚一年了。','My sister has been married for a year.']]),
      vocabWord('das Geburtsdatum','出生日期','date of birth','die Geburtsdaten · 中性 / neuter',[
        ['Mein Geburtsdatum ist der 8. Mai 1998.','我的出生日期是 1998 年 5 月 8 日。','My date of birth is 8 May 1998.'],
        ['Bitte tragen Sie Ihr Geburtsdatum ein.','请填写您的出生日期。','Please enter your date of birth.'],
        ['Das Geburtsdatum steht im Pass.','出生日期写在护照上。','The date of birth is in the passport.']]),
      vocabWord('buchstabieren','拼写','to spell','buchstabiert · hat buchstabiert',[
        ['Können Sie Ihren Namen buchstabieren?','您能拼一下自己的名字吗？','Can you spell your name?'],
        ['Ich buchstabiere: M-I-A.','我拼写一下：M-I-A。','I will spell it: M-I-A.'],
        ['Bitte buchstabieren Sie den Straßennamen.','请拼写一下街道名称。','Please spell the street name.']])
    ]
  },
  {
    id:'a1-transit', level:'A1', title:['在车站出行','Getting around at the station'],
    de:'Am Bahnhof', icon:'arrow', video:'wnVpyqtIQOE',
    videoTitle:'How to Book a Train Ticket in Germany | Super Easy German 294',
    goal:['购买车票，确认出发时间、站台和换乘信息。','Buy a ticket and confirm departure time, platform and connections.'],
    words:[
      vocabWord('der Bahnhof','火车站','train station','die Bahnhöfe · 阳性 / masculine',[
        ['Wo ist der Bahnhof?','火车站在哪里？','Where is the train station?'],
        ['Wir treffen uns vor dem Bahnhof.','我们在火车站前见面。','We are meeting in front of the station.'],
        ['Am Bahnhof gibt es einen Fahrkartenautomaten.','车站里有一台售票机。','There is a ticket machine at the station.']]),
      vocabWord('die Fahrkarte','车票','ticket','die Fahrkarten · 阴性 / feminine',[
        ['Ich brauche eine Fahrkarte nach Bonn.','我需要一张去波恩的车票。','I need a ticket to Bonn.'],
        ['Wo kann ich die Fahrkarte kaufen?','我在哪里可以买车票？','Where can I buy the ticket?'],
        ['Bitte zeigen Sie Ihre Fahrkarte.','请出示您的车票。','Please show your ticket.']]),
      vocabWord('der Zug','火车','train','die Züge · 阳性 / masculine',[
        ['Der Zug nach Berlin fährt um neun Uhr.','去柏林的火车九点发车。','The train to Berlin leaves at nine.'],
        ['Ist das der Zug nach Hamburg?','这是去汉堡的火车吗？','Is this the train to Hamburg?'],
        ['Unser Zug hat zehn Minuten Verspätung.','我们的火车晚点十分钟。','Our train is ten minutes late.']]),
      vocabWord('abfahren','出发；发车','to depart','fährt ab · ist abgefahren',[
        ['Wann fährt der Zug ab?','火车什么时候发车？','When does the train leave?'],
        ['Der Bus fährt vor dem Bahnhof ab.','公交车从火车站前发车。','The bus leaves in front of the station.'],
        ['Wir fahren um 18 Uhr ab.','我们十八点出发。','We leave at 6 p.m.']]),
      vocabWord('ankommen','到达','to arrive','kommt an · ist angekommen',[
        ['Wann kommen wir in München an?','我们什么时候到慕尼黑？','When do we arrive in Munich?'],
        ['Der Zug kommt auf Gleis vier an.','火车到达四号站台。','The train arrives at platform four.'],
        ['Ich bin gut in Köln angekommen.','我已平安到达科隆。','I arrived safely in Cologne.']]),
      vocabWord('der Bahnsteig','站台','platform','die Bahnsteige · 阳性 / masculine',[
        ['Der Zug steht am Bahnsteig drei.','火车停在三号站台。','The train is at platform three.'],
        ['Wie komme ich zum Bahnsteig fünf?','我怎么去五号站台？','How do I get to platform five?'],
        ['Auf dem Bahnsteig ist es heute voll.','今天站台上人很多。','The platform is crowded today.']]),
      vocabWord('aussteigen','下车','to get off','steigt aus · ist ausgestiegen',[
        ['Sie müssen am Hauptbahnhof aussteigen.','您必须在中央火车站下车。','You need to get off at the main station.'],
        ['Wir steigen an der nächsten Haltestelle aus.','我们在下一站下车。','We get off at the next stop.'],
        ['Bitte erst aussteigen lassen.','请先让乘客下车。','Please let passengers get off first.']]),
      vocabWord('der Bus','公交车','bus','die Busse · 阳性 / masculine',[
        ['Welcher Bus fährt ins Zentrum?','哪路公交车去市中心？','Which bus goes to the city centre?'],
        ['Der Bus kommt alle zehn Minuten.','公交车每十分钟一班。','The bus comes every ten minutes.'],
        ['Ich fahre mit dem Bus zur Arbeit.','我乘公交车上班。','I take the bus to work.']]),
      vocabWord('die Haltestelle','车站；公交站','stop; station','die Haltestellen · 阴性 / feminine',[
        ['Die Haltestelle ist gleich dort.','车站就在那边。','The stop is right over there.'],
        ['Wie heißt die nächste Haltestelle?','下一站叫什么？','What is the next stop called?'],
        ['Wir warten an der Haltestelle.','我们在车站等候。','We are waiting at the stop.']]),
      vocabWord('das Ticket','票；车票','ticket','die Tickets · 中性 / neuter',[
        ['Kann ich das Ticket mit Karte bezahlen?','我可以刷卡买票吗？','Can I pay for the ticket by card?'],
        ['Das Ticket gilt bis morgen.','这张票有效到明天。','The ticket is valid until tomorrow.'],
        ['Bitte kaufen Sie das Ticket vor der Fahrt.','请在乘车前买票。','Please buy the ticket before the journey.']]),
      vocabWord('pünktlich','准时的；准时地','punctual; on time','形容词 / 副词 · adjective / adverb',[
        ['Der Zug ist heute pünktlich.','火车今天准点。','The train is on time today.'],
        ['Bitte seien Sie pünktlich am Bahnhof.','请准时到达火车站。','Please be at the station on time.'],
        ['Wir sind pünktlich angekommen.','我们准时到达了。','We arrived on time.']]),
      vocabWord('zurück','回来；往回','back','副词 / adverb',[
        ['Ich möchte eine Fahrkarte hin und zurück.','我想要一张往返票。','I would like a return ticket.'],
        ['Wann fahren Sie zurück?','您什么时候返回？','When are you travelling back?'],
        ['Am Sonntag komme ich zurück.','我周日回来。','I am coming back on Sunday.']])
    ]
  }
];

UNITS.push(...A1_OFFICIAL_UNITS);

LESSONS['a1-personal'] = {
  title:['报名第一天，介绍自己','Introducing yourself on enrolment day'],
  intro:['Mia 在语言班报名处回答个人信息问题。留意正式问句，以及德语陈述句中动词的位置。','Mia answers personal-information questions at a language school. Notice formal questions and verb position in German statements.'],
  lines:[
    {speaker:'Mitarbeiterin',de:'Guten Morgen. Wie ist Ihr Name?',zh:'早上好。您叫什么名字？',en:'Good morning. What is your name?',words:[1]},
    {speaker:'Mia',de:'Mein Name ist Mia Chen. Mein Vorname ist Mia.',zh:'我叫 Mia Chen。我的名字是 Mia。',en:'My name is Mia Chen. My first name is Mia.',words:[1,2]},
    {speaker:'Mitarbeiterin',de:'Können Sie Ihren Nachnamen bitte buchstabieren?',zh:'请问您能拼一下姓氏吗？',en:'Could you spell your surname, please?',words:[11]},
    {speaker:'Mia',de:'Natürlich: C-H-E-N. Ich komme aus China und wohne jetzt in Köln.',zh:'当然：C-H-E-N。我来自中国，现在住在科隆。',en:'Of course: C-H-E-N. I come from China and now live in Cologne.',words:[5,4]},
    {speaker:'Mitarbeiterin',de:'Welche Sprachen sprechen Sie und was sind Sie von Beruf?',zh:'您会说哪些语言？您的职业是什么？',en:'Which languages do you speak, and what do you do for a living?',words:[6,7]},
    {speaker:'Mia',de:'Ich spreche Chinesisch und Englisch. Ich bin Designerin.',zh:'我说中文和英语。我是一名设计师。',en:'I speak Chinese and English. I am a designer.',words:[6,7]}
  ],
  grammar:{
    title:['问个人信息：W-Fragen 与动词第二位','Personal information: W-questions and verb-second'],
    rule:['带疑问词的问句通常是“疑问词 + 变位动词 + 主语”：Wo wohnen Sie? 陈述句中变位动词通常占第二位：Ich wohne in Köln；Jetzt wohne ich in Köln。正式场合用 Sie / Ihr，熟人之间用 du / dein。','A question with a question word usually follows question word + conjugated verb + subject: Wo wohnen Sie? In a statement, the conjugated verb normally occupies the second position: Ich wohne in Köln; Jetzt wohne ich in Köln. Use Sie / Ihr formally and du / dein with people you know.'],
    pattern:'Wie / Wo / Woher / Was + Verb + Subjekt + …?',
    examples:[
      ['Woher kommen Sie? — Ich komme aus China.','您来自哪里？——我来自中国。','Where are you from? — I come from China.'],
      ['Was sind Sie von Beruf? — Ich bin Designerin.','您的职业是什么？——我是一名设计师。','What do you do? — I am a designer.']
    ],
    pitfall:['不要说 Wo Sie wohnen? 独立问句需要把动词放在主语前：Wo wohnen Sie? 回答时是 Ich wohne …。','Do not say Wo Sie wohnen? In an independent question, place the verb before the subject: Wo wohnen Sie? In the answer, use Ich wohne ….'],
    task:['正式介绍自己的姓名、来源、居住地和职业，并问对方来自哪里。','Formally introduce your name, origin, home and occupation, then ask where the other person comes from.'],
    answer:'Mein Name ist Mia Chen. Ich komme aus China, wohne in Köln und bin Designerin. Woher kommen Sie?'
  },
  check:{
    prompt:['Mia 目前住在哪里？','Where does Mia currently live?'],
    options:[['在中国','In China'],['在科隆','In Cologne'],['在柏林','In Berlin']],correct:1,
    explanation:['Mia 说“Ich komme aus China und wohne jetzt in Köln”：她来自中国，现在住在科隆。','Mia says “Ich komme aus China und wohne jetzt in Köln”: she is from China and currently lives in Cologne.']
  },
  oral:['模拟语言班报名：说出姓名并拼写姓氏，再介绍来源、居住地、语言和职业。最后向工作人员提出一个个人信息问题。','Role-play language-school enrolment: give your name, spell your surname, and state your origin, home, languages and occupation. Finish by asking the staff member one personal-information question.'],
  rubric:[['我能使用正式称呼 Sie。','I can use the formal Sie.'],['问句中动词在主语前。','The verb comes before the subject in my questions.'],['我能拼写姓名并说出四项个人信息。','I can spell my name and give four pieces of personal information.']]
};

LESSONS['a1-transit'] = {
  title:['买一张去波恩的往返票','Buying a return ticket to Bonn'],
  intro:['Leo 在车站售票处买票，并确认时间和站台。注意 abfahren、ankommen、aussteigen 这类可分动词。','Leo buys a ticket at the station and confirms the time and platform. Notice separable verbs such as abfahren, ankommen and aussteigen.'],
  lines:[
    {speaker:'Leo',de:'Guten Tag. Ich möchte eine Fahrkarte nach Bonn, hin und zurück.',zh:'您好。我想买一张去波恩的往返票。',en:'Hello. I would like a return ticket to Bonn.',words:[1,11]},
    {speaker:'Mitarbeiter',de:'Gern. Möchten Sie heute zurückfahren?',zh:'好的。您想今天返回吗？',en:'Certainly. Would you like to return today?',words:[11]},
    {speaker:'Leo',de:'Ja. Wann fährt der nächste Zug ab?',zh:'是的。下一班火车什么时候发车？',en:'Yes. When does the next train leave?',words:[2,3]},
    {speaker:'Mitarbeiter',de:'Er fährt um 10:12 Uhr auf Bahnsteig drei ab.',zh:'十点十二分从三号站台发车。',en:'It leaves at 10:12 from platform three.',words:[3,5]},
    {speaker:'Leo',de:'Muss ich umsteigen?',zh:'我需要换乘吗？',en:'Do I need to change trains?',words:[]},
    {speaker:'Mitarbeiter',de:'Nein. Sie kommen um 11:05 Uhr in Bonn an.',zh:'不需要。您十一点零五分到达波恩。',en:'No. You arrive in Bonn at 11:05.',words:[4]}
  ],
  grammar:{
    title:['可分动词：前缀去句尾','Separable verbs: move the prefix to the end'],
    rule:['在一般现在时主句中，可分动词的变位部分放第二位，前缀放句尾：Der Zug fährt um zehn Uhr ab。疑问词问句也是如此：Wann kommt der Zug an? 与情态动词连用时，不定式整体放句尾：Ich muss in Köln aussteigen。','In a present-tense main clause, the conjugated part of a separable verb is in second position and the prefix goes to the end: Der Zug fährt um zehn Uhr ab. The same applies to questions: Wann kommt der Zug an? With a modal verb, the complete infinitive goes at the end: Ich muss in Köln aussteigen.'],
    pattern:'Subjekt + fährt / kommt / steigt + … + ab / an / aus.',
    examples:[
      ['Der Zug fährt um 10:12 Uhr ab.','火车十点十二分发车。','The train leaves at 10:12.'],
      ['Wir kommen um 11:05 Uhr an.','我们十一点零五分到达。','We arrive at 11:05.']
    ],
    pitfall:['主句中不要把可分动词写成 Der Zug abfährt。应说 Der Zug fährt ab。只有在情态动词后才保留完整不定式，例如 Der Zug muss pünktlich abfahren。','Do not say Der Zug abfährt in a main clause. Say Der Zug fährt ab. Keep the infinitive together after a modal verb, as in Der Zug muss pünktlich abfahren.'],
    task:['询问下一班去柏林的火车何时出发、从哪个站台出发，并确认何时到达。','Ask when the next train to Berlin leaves and from which platform, then confirm when it arrives.'],
    answer:'Wann fährt der nächste Zug nach Berlin ab? Von welchem Bahnsteig fährt er ab? Wann kommt er in Berlin an?'
  },
  check:{
    prompt:['Leo 是否需要换乘？','Does Leo need to change trains?'],
    options:[['需要，在科隆换乘','Yes, in Cologne'],['不需要，可以直达','No, it is direct'],['对话没有说明','The dialogue does not say']],correct:1,
    explanation:['工作人员回答“Nein”，随后直接给出抵达波恩的时间，因此这趟行程不需要换乘。','The staff member answers “Nein” and then gives the arrival time in Bonn, so the journey is direct.']
  },
  oral:['你在车站买一张往返票：说明目的地和返回日期，询问发车时间、站台、是否换乘以及到达时间。','Buy a return ticket at the station: state your destination and return date, then ask about departure time, platform, changes and arrival time.'],
  rubric:[['我能说清单程或往返。','I can specify a single or return ticket.'],['我能正确拆分 abfahren / ankommen。','I can separate abfahren / ankommen correctly.'],['我问到了时间、站台和换乘。','I ask about time, platform and connections.']]
};
