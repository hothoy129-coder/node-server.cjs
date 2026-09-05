'use strict';
/* Curated expansion for the eight existing situations. Existing four words keep
 * their positions so saved card IDs remain stable. A1 selections were checked
 * against the supplied Goethe Start Deutsch 1 list; all teaching examples here
 * are original Klar examples. Every card has three examples. */
const vocabWord=(de,zh,en,morph,examples)=>[de,zh,en,morph,...examples.flat()];
const THIRD_EXAMPLES={
 'a1-cafe':[
  ['Der Kaffee ist noch heiß.','咖啡还是热的。','The coffee is still hot.'],
  ['Ich bestelle am Tresen.','我在柜台点单。','I order at the counter.'],
  ['Die Milch steht im Kühlschrank.','牛奶放在冰箱里。','The milk is in the fridge.'],
  ['Wo kann ich bezahlen?','我可以在哪里付款？','Where can I pay?']],
 'a1-food':[
  ['Auf der Speisekarte gibt es drei Suppen.','菜单上有三种汤。','There are three soups on the menu.'],
  ['Bringen Sie uns bitte noch Wasser.','请再给我们送些水。','Please bring us some more water.'],
  ['Wir möchten getrennt bezahlen; bringen Sie bitte die Rechnungen.','我们想分开付款，请拿两张账单来。','We would like to pay separately; please bring the bills.'],
  ['Der Salat sieht lecker aus.','沙拉看起来很好吃。','The salad looks delicious.']],
 'a2-home':[
  ['Die Wohnung liegt in einer ruhigen Straße.','这套公寓位于一条安静的街上。','The apartment is on a quiet street.'],
  ['Ist die Miete inklusive Nebenkosten?','租金包含杂费吗？','Does the rent include utilities?'],
  ['Am Samstag besichtigen wir zwei Wohnungen.','周六我们去看两套公寓。','On Saturday we are viewing two apartments.'],
  ['Bitte bestätigen Sie den Termin per E-Mail.','请通过电子邮件确认预约。','Please confirm the appointment by email.']],
 'a2-move':[
  ['Für die Haustür brauche ich einen zweiten Schlüssel.','我需要一把大门的备用钥匙。','I need a second key for the front door.'],
  ['Warum möchtet ihr umziehen?','你们为什么想搬家？','Why do you want to move?'],
  ['Gestern habe ich meine neue Nachbarin kennengelernt.','昨天我认识了新邻居。','Yesterday I met my new neighbor.'],
  ['Beide Seiten unterschreiben den Vertrag.','双方在合同上签字。','Both parties sign the contract.']],
 'b1-apply':[
  ['Auf welche Stelle möchten Sie sich bewerben?','您想申请哪个职位？','Which position would you like to apply for?'],
  ['Während meiner Ausbildung habe ich praktische Erfahrung gesammelt.','培训期间我积累了实践经验。','I gained practical experience during my training.'],
  ['Der Lebenslauf sollte übersichtlich sein.','简历应该条理清晰。','The CV should be clearly structured.'],
  ['Als zuverlässige Kollegin halte ich meine Zusagen ein.','作为可靠的同事，我会履行承诺。','As a reliable colleague, I keep my commitments.']],
 'b1-work':[
  ['Nach der Besprechung schicke ich ein Protokoll.','会议后我会发送会议记录。','I will send minutes after the meeting.'],
  ['Die Besprechung wurde auf Donnerstag verschoben.','会议被推迟到周四。','The meeting was moved to Thursday.'],
  ['Für diese Aufgabe bin ich nicht zuständig.','我不负责这项任务。','I am not responsible for this task.'],
  ['Lassen Sie uns einen realistischen Zeitplan vereinbaren.','我们来商定一个切实可行的时间表吧。','Let us agree on a realistic schedule.']],
 'b2-city':[
  ['Für Familien spielt die Lebensqualität eine zentrale Rolle.','对家庭而言，生活质量至关重要。','Quality of life plays a central role for families.'],
  ['Eine direkte Zugverbindung verbessert die Anbindung der Region.','直达列车改善了该地区的交通连接。','A direct train service improves the region’s connections.'],
  ['Bevor wir entscheiden, sollten wir Kosten und Nutzen abwägen.','决定前，我们应该权衡成本和收益。','Before deciding, we should weigh up costs and benefits.'],
  ['Auch in Großstädten muss Wohnen bezahlbar bleiben.','即使在大城市，住房也必须保持可负担。','Housing must remain affordable even in big cities.']],
 'b2-debate':[
  ['Aus wirtschaftlicher Sicht ist dieser Standpunkt nachvollziehbar.','从经济角度看，这一立场可以理解。','From an economic perspective, this viewpoint is understandable.'],
  ['Die vorliegenden Zahlen haben viele Skeptiker überzeugt.','现有数据说服了许多怀疑者。','The available figures convinced many skeptics.'],
  ['Bei der Planung müssen wir unterschiedliche Bedürfnisse berücksichtigen.','规划时我们必须考虑不同需求。','We must take different needs into account when planning.'],
  ['Langfristige Auswirkungen lassen sich noch nicht abschließend beurteilen.','长期影响目前还无法作出最终评估。','The long-term effects cannot yet be assessed conclusively.']]
};
const VOCABULARY_EXPANSION={
 'a1-cafe':[
  vocabWord('der Tee','茶','tea','die Tees · 阳性 / masculine',[
   ['Ich möchte einen Tee, bitte.','我想要一杯茶，谢谢。','I would like a tea, please.'],['Trinkst du schwarzen oder grünen Tee?','你喝红茶还是绿茶？','Do you drink black or green tea?'],['Der Tee muss noch ziehen.','茶还需要泡一会儿。','The tea still needs to steep.']]),
  vocabWord('das Café','咖啡馆','café','die Cafés · 中性 / neuter',[
   ['Wir treffen uns morgen im Café.','我们明天在咖啡馆见。','We are meeting at the café tomorrow.'],['Das Café öffnet um acht Uhr.','咖啡馆八点开门。','The café opens at eight.'],['Im Café ist noch ein Platz frei.','咖啡馆里还有一个空位。','There is still a free seat in the café.']]),
  vocabWord('der Kuchen','蛋糕','cake','die Kuchen · 阳性 / masculine',[
   ['Ich nehme ein Stück Kuchen.','我要一块蛋糕。','I will have a piece of cake.'],['Der Kuchen kostet drei Euro.','蛋糕三欧元。','The cake costs three euros.'],['Möchtest du Kuchen zum Kaffee?','你喝咖啡时想吃蛋糕吗？','Would you like cake with your coffee?']]),
  vocabWord('möchten','想要；希望','would like','ich möchte · 情态动词 / modal verb',[
   ['Ich möchte bitte bestellen.','我想点单。','I would like to order.'],['Was möchten Sie trinken?','您想喝什么？','What would you like to drink?'],['Wir möchten draußen sitzen.','我们想坐在外面。','We would like to sit outside.']]),
  vocabWord('mitnehmen','带走；外带','to take away','nimmt mit · hat mitgenommen',[
   ['Ich möchte den Kaffee mitnehmen.','我想把咖啡带走。','I would like the coffee to take away.'],['Kann ich das Gebäck mitnehmen?','我可以把点心打包吗？','Can I take the pastry away?'],['Sie nimmt noch eine Flasche Wasser mit.','她还带走一瓶水。','She takes another bottle of water with her.']]),
  vocabWord('die Bäckerei','面包店','bakery','die Bäckereien · 阴性 / feminine',[
   ['Die Bäckerei ist gleich um die Ecke.','面包店就在拐角处。','The bakery is just around the corner.'],['Ich kaufe in der Bäckerei ein Brötchen.','我在面包店买一个小面包。','I buy a bread roll at the bakery.'],['Wann öffnet die Bäckerei?','面包店几点开门？','When does the bakery open?']]),
  vocabWord('frühstücken','吃早餐','to have breakfast','frühstückt · hat gefrühstückt',[
   ['Wir frühstücken um sieben Uhr.','我们七点吃早餐。','We have breakfast at seven.'],['Am Sonntag frühstücke ich im Café.','周日我在咖啡馆吃早餐。','On Sunday I have breakfast at a café.'],['Möchten Sie zuerst frühstücken?','您想先吃早餐吗？','Would you like to have breakfast first?']]),
  vocabWord('der Appetit','食欲；胃口','appetite','通常无复数 / usually uncountable',[
   ['Guten Appetit!','祝您好胃口！','Enjoy your meal!'],['Nach dem Ausflug habe ich großen Appetit.','郊游后我胃口很好。','I have a big appetite after the outing.'],['Heute habe ich wenig Appetit.','我今天没什么胃口。','I do not have much appetite today.']])],
 'a1-food':[
  vocabWord('das Restaurant','餐厅','restaurant','die Restaurants · 中性 / neuter',[
   ['Das Restaurant öffnet um zwölf Uhr.','餐厅十二点开门。','The restaurant opens at twelve.'],['Heute essen wir in einem Restaurant.','我们今天在餐厅吃饭。','Today we are eating at a restaurant.'],['Ist das Restaurant am Sonntag geöffnet?','餐厅周日开门吗？','Is the restaurant open on Sunday?']]),
  vocabWord('das Essen','饭菜；食物','food; meal','通常无复数 / usually uncountable',[
   ['Das Essen ist schon fertig.','饭已经做好了。','The food is ready.'],['Wie schmeckt das Essen?','饭菜味道怎么样？','How does the food taste?'],['Wir warten noch auf das Essen.','我们还在等上菜。','We are still waiting for the food.']]),
  vocabWord('der Salat','沙拉','salad','die Salate · 阳性 / masculine',[
   ['Ich nehme einen kleinen Salat.','我要一份小沙拉。','I will have a small salad.'],['Bitte den Salat ohne Zwiebeln.','沙拉请不要洋葱。','The salad without onions, please.'],['Zum Salat gibt es ein Dressing.','沙拉配有酱汁。','The salad comes with a dressing.']]),
  vocabWord('das Getränk','饮料','drink; beverage','die Getränke · 中性 / neuter',[
   ['Welches Getränk möchten Sie?','您想要哪种饮料？','Which drink would you like?'],['Die Getränke kommen gleich.','饮料马上就来。','The drinks will arrive shortly.'],['Im Preis ist ein Getränk dabei.','价格中包含一杯饮料。','One drink is included in the price.']]),
  vocabWord('schmecken','尝起来；合口味','to taste','schmeckt · hat geschmeckt',[
   ['Wie schmeckt dir der Salat?','你觉得沙拉味道怎么样？','How does the salad taste to you?'],['Das Brot schmeckt sehr gut.','面包很好吃。','The bread tastes very good.'],['Schmeckt Ihnen der Saft?','您觉得果汁好喝吗？','Do you like the taste of the juice?']]),
  vocabWord('der Saft','果汁','juice','die Säfte · 阳性 / masculine',[
   ['Ich nehme einen Apfelsaft.','我要一杯苹果汁。','I will have an apple juice.'],['Der Saft ist im Kühlschrank.','果汁在冰箱里。','The juice is in the fridge.'],['Möchtest du Wasser oder Saft?','你想喝水还是果汁？','Would you like water or juice?']]),
  vocabWord('die Kasse','收银台','checkout; cash desk','die Kassen · 阴性 / feminine',[
   ['Bitte bezahlen Sie an der Kasse.','请在收银台付款。','Please pay at the checkout.'],['Die Kasse ist dort links.','收银台在那边左侧。','The checkout is over there on the left.'],['An der Kasse ist eine kurze Pause.','收银台暂时休息。','The checkout is taking a short break.']]),
  vocabWord('der Preis','价格','price','die Preise · 阳性 / masculine',[
   ['Der Preis steht auf der Karte.','价格写在菜单上。','The price is shown on the menu.'],['Ist das Getränk im Preis dabei?','饮料包含在价格里吗？','Is the drink included in the price?'],['Dieser Preis ist günstig.','这个价格很实惠。','This price is good value.']])],
 'a2-home':[
  vocabWord('das Zimmer','房间','room','die Zimmer · 中性 / neuter',[
   ['Die Wohnung hat drei Zimmer.','这套公寓有三个房间。','The apartment has three rooms.'],['Das Zimmer ist hell und ruhig.','房间明亮又安静。','The room is bright and quiet.'],['Ist das Zimmer bereits möbliert?','房间已经带家具了吗？','Is the room already furnished?']]),
  vocabWord('die Küche','厨房','kitchen','die Küchen · 阴性 / feminine',[
   ['Die Küche ist neu renoviert.','厨房刚翻新。','The kitchen has been newly renovated.'],['Gehört die Küche zur Wohnung?','厨房属于这套房吗？','Is the kitchen included with the apartment?'],['In der Küche ist Platz für einen Tisch.','厨房里有地方放一张桌子。','There is room for a table in the kitchen.']]),
  vocabWord('möbliert','带家具的','furnished','形容词 / adjective',[
   ['Ich suche ein möbliertes Zimmer.','我在找一间带家具的房间。','I am looking for a furnished room.'],['Die Wohnung wird möbliert vermietet.','这套公寓带家具出租。','The apartment is rented furnished.'],['Ist die Küche komplett möbliert?','厨房家具齐全吗？','Is the kitchen fully furnished?']]),
  vocabWord('die Nebenkosten','附加费用；杂费','utilities; service charges','只用复数 / plural only',[
   ['Wie hoch sind die Nebenkosten?','杂费是多少？','How high are the service charges?'],['Die Heizung ist in den Nebenkosten enthalten.','暖气费包含在杂费中。','Heating is included in the service charges.'],['Strom gehört nicht zu den Nebenkosten.','电费不在杂费里。','Electricity is not included in the service charges.']]),
  vocabWord('die Kaution','押金','deposit','die Kautionen · 阴性 / feminine',[
   ['Die Kaution beträgt zwei Monatsmieten.','押金是两个月房租。','The deposit is two months’ rent.'],['Wann muss ich die Kaution bezahlen?','我什么时候必须交押金？','When do I have to pay the deposit?'],['Nach dem Auszug bekomme ich die Kaution zurück.','搬走后我会拿回押金。','I will get the deposit back after moving out.']]),
  vocabWord('der Vermieter','男房东','landlord','die Vermieter · 阳性 / masculine',[
   ['Der Vermieter zeigt uns die Wohnung.','房东带我们看公寓。','The landlord shows us the apartment.'],['Ich rufe den Vermieter morgen an.','我明天给房东打电话。','I will call the landlord tomorrow.'],['Der Vermieter schickt den Vertrag per E-Mail.','房东通过邮件发送合同。','The landlord sends the contract by email.']]),
  vocabWord('die Anzeige','广告；房源信息','advertisement; listing','die Anzeigen · 阴性 / feminine',[
   ['Ich habe Ihre Anzeige online gesehen.','我在网上看到了您的房源信息。','I saw your listing online.'],['In der Anzeige steht die genaue Miete.','房源信息里写着确切租金。','The exact rent is stated in the listing.'],['Die Anzeige enthält keine Fotos.','这则广告没有图片。','The listing contains no photos.']]),
  vocabWord('verfügbar','可用的；可入住的','available','形容词 / adjective',[
   ['Ist die Wohnung ab Oktober verfügbar?','公寓十月起可以入住吗？','Is the apartment available from October?'],['Am Freitag ist noch ein Termin verfügbar.','周五还有一个预约时段。','An appointment is still available on Friday.'],['Leider ist das Zimmer nicht mehr verfügbar.','很遗憾，房间已经租出去了。','Unfortunately, the room is no longer available.']])],
 'a2-move':[
  vocabWord('der Umzug','搬家','move; relocation','die Umzüge · 阳性 / masculine',[
   ['Der Umzug ist für Samstag geplant.','搬家安排在周六。','The move is planned for Saturday.'],['Beim Umzug helfen uns Freunde.','朋友们帮我们搬家。','Friends are helping us with the move.'],['Nach dem Umzug müssen wir uns anmelden.','搬家后我们必须登记。','We have to register after the move.']]),
  vocabWord('der Karton','纸箱','cardboard box','die Kartons · 阳性 / masculine',[
   ['Die Bücher kommen in diesen Karton.','书放进这个纸箱。','The books go into this box.'],['Wir brauchen noch zehn Kartons.','我们还需要十个纸箱。','We need ten more boxes.'],['Schreib bitte „Küche“ auf den Karton.','请在纸箱上写“厨房”。','Please write “kitchen” on the box.']]),
  vocabWord('tragen','搬；提；穿','to carry; to wear','trägt · hat getragen',[
   ['Kannst du den Karton tragen?','你能搬这个箱子吗？','Can you carry the box?'],['Wir tragen das Sofa nach oben.','我们把沙发搬到楼上。','We are carrying the sofa upstairs.'],['Beim Umzug trage ich bequeme Schuhe.','搬家时我穿舒适的鞋。','I wear comfortable shoes during the move.']]),
  vocabWord('aufbauen','组装；搭建','to assemble; set up','baut auf · hat aufgebaut',[
   ['Wir müssen noch das Bett aufbauen.','我们还得组装床。','We still have to assemble the bed.'],['Wer baut den Schrank auf?','谁来组装衣柜？','Who is assembling the wardrobe?'],['Am Abend haben wir alle Möbel aufgebaut.','晚上我们把所有家具组装好了。','By evening we had assembled all the furniture.']]),
  vocabWord('sich anmelden','登记；注册','to register','meldet sich an · hat sich angemeldet',[
   ['Ich muss mich beim Bürgeramt anmelden.','我必须去市民服务处登记。','I have to register at the citizens’ office.'],['Haben Sie sich schon angemeldet?','您已经登记了吗？','Have you already registered?'],['Wir melden uns online für einen Termin an.','我们在线预约登记时间。','We register online for an appointment.']]),
  vocabWord('der Briefkasten','信箱','mailbox','die Briefkästen · 阳性 / masculine',[
   ['Unser Name fehlt am Briefkasten.','信箱上没有我们的名字。','Our name is missing from the mailbox.'],['Der Brief liegt im Briefkasten.','信在信箱里。','The letter is in the mailbox.'],['Jede Wohnung hat einen eigenen Briefkasten.','每套公寓都有自己的信箱。','Each apartment has its own mailbox.']]),
  vocabWord('die Heizung','暖气；供暖设备','heating; heater','die Heizungen · 阴性 / feminine',[
   ['Die Heizung funktioniert nicht.','暖气坏了。','The heating is not working.'],['Könnten Sie die Heizung prüfen?','您能检查一下暖气吗？','Could you check the heating?'],['Im Winter stellen wir die Heizung höher.','冬天我们把暖气调高。','We turn the heating up in winter.']]),
  vocabWord('kaputt','坏的','broken','形容词 / adjective',[
   ['Die Lampe im Flur ist kaputt.','走廊的灯坏了。','The lamp in the hallway is broken.'],['Beim Umzug ist ein Glas kaputtgegangen.','搬家时一个玻璃杯碎了。','A glass broke during the move.'],['Was machen wir, wenn etwas kaputt ist?','东西坏了我们怎么办？','What do we do if something is broken?']])],
 'b1-apply':[
  vocabWord('die Bewerbung','申请材料；求职申请','application','die Bewerbungen · 阴性 / feminine',[
   ['Ich schicke meine Bewerbung heute ab.','我今天提交申请。','I am sending my application today.'],['Ihre Bewerbung ist bei uns eingegangen.','我们已收到您的申请。','We have received your application.'],['Zu einer vollständigen Bewerbung gehört ein Lebenslauf.','完整申请包括一份简历。','A complete application includes a CV.']]),
  vocabWord('das Anschreiben','求职信','cover letter','die Anschreiben · 中性 / neuter',[
   ['Im Anschreiben erkläre ich meine Motivation.','我在求职信中说明动机。','I explain my motivation in the cover letter.'],['Das Anschreiben sollte nicht zu lang sein.','求职信不应过长。','The cover letter should not be too long.'],['Bitte passen Sie das Anschreiben an die Stelle an.','请根据职位调整求职信。','Please adapt the cover letter to the position.']]),
  vocabWord('die Qualifikation','资质；资格','qualification','die Qualifikationen · 阴性 / feminine',[
   ['Welche Qualifikationen sind erforderlich?','需要哪些资质？','Which qualifications are required?'],['Sie bringt die passende Qualifikation mit.','她具备合适的资质。','She has the right qualification.'],['Im Lebenslauf liste ich meine Qualifikationen auf.','我在简历中列出自己的资质。','I list my qualifications in my CV.']]),
  vocabWord('die Fähigkeit','能力；技能','ability; skill','die Fähigkeiten · 阴性 / feminine',[
   ['Teamfähigkeit ist für diese Stelle wichtig.','团队合作能力对这个职位很重要。','Teamwork skills are important for this position.'],['Ich möchte meine sprachlichen Fähigkeiten verbessern.','我想提升语言能力。','I want to improve my language skills.'],['Nennen Sie drei relevante Fähigkeiten.','请列举三项相关技能。','Name three relevant skills.']]),
  vocabWord('die Ausbildung','职业培训；教育','vocational training; education','die Ausbildungen · 阴性 / feminine',[
   ['Ich habe eine Ausbildung im Einzelhandel gemacht.','我接受过零售职业培训。','I completed vocational training in retail.'],['Die Ausbildung dauert drei Jahre.','培训持续三年。','The training lasts three years.'],['Während der Ausbildung arbeite ich in verschiedenen Abteilungen.','培训期间我在不同部门工作。','I work in different departments during the training.']]),
  vocabWord('das Vorstellungsgespräch','面试','job interview','die Vorstellungsgespräche · 中性 / neuter',[
   ['Morgen habe ich ein Vorstellungsgespräch.','我明天有一场面试。','I have a job interview tomorrow.'],['Für das Vorstellungsgespräch bereite ich Beispiele vor.','我为面试准备实例。','I prepare examples for the interview.'],['Das Vorstellungsgespräch findet online statt.','面试在线进行。','The interview takes place online.']]),
  vocabWord('einstellen','雇用；调整','to hire; adjust','stellt ein · hat eingestellt',[
   ['Die Firma möchte neue Mitarbeitende einstellen.','公司想招聘新员工。','The company wants to hire new employees.'],['Wann können Sie mich einstellen?','你们什么时候可以雇用我？','When can you hire me?'],['Wir stellen dieses Jahr zwei Auszubildende ein.','我们今年招聘两名学徒。','We are hiring two trainees this year.']]),
  vocabWord('die Rückmeldung','反馈；回复','feedback; response','die Rückmeldungen · 阴性 / feminine',[
   ['Vielen Dank für Ihre schnelle Rückmeldung.','感谢您的快速回复。','Thank you for your quick response.'],['Wann kann ich mit einer Rückmeldung rechnen?','我什么时候能收到回复？','When can I expect a response?'],['Die Rückmeldung zum Gespräch war positiv.','面试反馈是积极的。','The feedback on the interview was positive.']])],
 'b1-work':[
  vocabWord('teilnehmen','参加','to participate','nimmt teil · hat teilgenommen',[
   ['Ich nehme an der Schulung teil.','我参加培训。','I am taking part in the training.'],['Wer kann morgen an der Besprechung teilnehmen?','谁明天能参加会议？','Who can attend the meeting tomorrow?'],['Sie hat per Video teilgenommen.','她通过视频参加了。','She took part by video.']]),
  vocabWord('erledigen','完成；处理','to complete; take care of','erledigt · hat erledigt',[
   ['Ich erledige die Aufgabe bis Freitag.','我会在周五前完成任务。','I will complete the task by Friday.'],['Diese Anfrage ist bereits erledigt.','这个请求已经处理完了。','This request has already been dealt with.'],['Was müssen wir heute noch erledigen?','我们今天还需要完成什么？','What do we still need to complete today?']]),
  vocabWord('zuständig','负责的','responsible','形容词 + für / adjective + für',[
   ['Wer ist für die Bestellung zuständig?','谁负责订购？','Who is responsible for the order?'],['Dafür ist eine andere Abteilung zuständig.','另一个部门负责这件事。','Another department is responsible for that.'],['Ich bin heute für den Empfang zuständig.','我今天负责接待。','I am responsible for reception today.']]),
  vocabWord('die Frist','截止期限','deadline','die Fristen · 阴性 / feminine',[
   ['Die Frist endet am Montag.','截止日期是周一。','The deadline ends on Monday.'],['Können wir die Frist verlängern?','我们能延长期限吗？','Can we extend the deadline?'],['Bitte beachten Sie die kurze Frist.','请注意期限很短。','Please note the short deadline.']]),
  vocabWord('sich kümmern','照管；处理','to take care','kümmert sich · hat sich gekümmert + um',[
   ['Ich kümmere mich um die E-Mails.','我来处理邮件。','I will take care of the emails.'],['Könnten Sie sich darum kümmern?','您能处理这件事吗？','Could you take care of that?'],['Meine Kollegin hat sich um das Problem gekümmert.','我的同事处理了这个问题。','My colleague took care of the problem.']]),
  vocabWord('Rücksprache halten','协商；请示','to consult','hält Rücksprache · hat Rücksprache gehalten',[
   ['Ich muss zuerst mit meinem Team Rücksprache halten.','我必须先和团队商量。','I need to consult my team first.'],['Bitte halten Sie kurz Rücksprache mit der Leitung.','请和管理层简短沟通一下。','Please consult management briefly.'],['Nach Rücksprache ändern wir den Termin.','协商后我们更改日期。','After consultation, we will change the date.']]),
  vocabWord('erreichbar','联系得上的；可到达的','reachable; available','形容词 / adjective',[
   ['Ich bin heute Nachmittag telefonisch erreichbar.','我今天下午可以通过电话联系。','I am available by phone this afternoon.'],['Die Datei ist über diesen Link erreichbar.','可以通过这个链接访问文件。','The file is accessible via this link.'],['Wann sind Sie am besten erreichbar?','什么时候最容易联系到您？','When is the best time to reach you?']]),
  vocabWord('Bescheid geben','通知；告知','to let someone know','gibt Bescheid · hat Bescheid gegeben',[
   ['Gib mir bitte bis morgen Bescheid.','请在明天前告诉我。','Please let me know by tomorrow.'],['Ich gebe dem Team sofort Bescheid.','我马上通知团队。','I will let the team know immediately.'],['Sie hat rechtzeitig Bescheid gegeben.','她及时通知了。','She gave notice in good time.']])],
 'b2-city':[
  vocabWord('der Nahverkehr','公共交通','local public transport','通常无复数 / usually uncountable',[
   ['Der Nahverkehr sollte zuverlässig und günstig sein.','公共交通应该可靠且实惠。','Local public transport should be reliable and affordable.'],['Viele Pendler nutzen täglich den Nahverkehr.','许多通勤者每天使用公共交通。','Many commuters use public transport every day.'],['Der Ausbau des Nahverkehrs entlastet die Straßen.','公共交通扩建能减轻道路压力。','Expanding public transport relieves the roads.']]),
  vocabWord('die Infrastruktur','基础设施','infrastructure','通常无复数 / usually uncountable',[
   ['Die digitale Infrastruktur muss modernisiert werden.','数字基础设施必须现代化。','Digital infrastructure must be modernized.'],['Eine gute Infrastruktur zieht Unternehmen an.','良好的基础设施能吸引企业。','Good infrastructure attracts businesses.'],['Ländliche Regionen brauchen eine bessere Infrastruktur.','农村地区需要更好的基础设施。','Rural regions need better infrastructure.']]),
  vocabWord('der Wohnraum','居住空间；住房','living space; housing','通常无复数 / usually uncountable',[
   ['Bezahlbarer Wohnraum fehlt in vielen Städten.','许多城市缺少可负担住房。','Affordable housing is lacking in many cities.'],['Leerstehende Gebäude könnten neuen Wohnraum bieten.','空置建筑可以提供新的居住空间。','Empty buildings could provide new housing.'],['Der vorhandene Wohnraum wird effizienter genutzt.','现有居住空间得到更高效的利用。','Existing housing is used more efficiently.']]),
  vocabWord('die Pendelzeit','通勤时间','commuting time','die Pendelzeiten · 阴性 / feminine',[
   ['Meine tägliche Pendelzeit beträgt eine Stunde.','我每天通勤一小时。','My daily commute takes one hour.'],['Homeoffice kann die Pendelzeit reduzieren.','居家办公可以减少通勤时间。','Working from home can reduce commuting time.'],['Eine kurze Pendelzeit erhöht meine Lebensqualität.','较短的通勤时间提升我的生活质量。','A short commute improves my quality of life.']]),
  vocabWord('die Umweltbelastung','环境负担；污染','environmental impact','die Umweltbelastungen · 阴性 / feminine',[
   ['Weniger Autoverkehr senkt die Umweltbelastung.','减少汽车交通可以降低环境负担。','Less car traffic reduces environmental impact.'],['Die Umweltbelastung ist in dicht bebauten Vierteln höher.','高密度城区的环境负担更高。','Environmental impact is higher in densely built districts.'],['Neue Maßnahmen sollen die Umweltbelastung begrenzen.','新措施旨在限制环境负担。','New measures are intended to limit environmental impact.']]),
  vocabWord('vielfältig','多样的','diverse; varied','形容词 / adjective',[
   ['Das kulturelle Angebot ist vielfältig.','文化活动非常多样。','The cultural offering is diverse.'],['In diesem Viertel leben vielfältige Gemeinschaften.','这个街区生活着多元群体。','Diverse communities live in this district.'],['Die Gründe für den Wohnungsmangel sind vielfältig.','住房短缺的原因多种多样。','The reasons for the housing shortage are varied.']]),
  vocabWord('sich auswirken','产生影响','to have an effect','wirkt sich aus · hat sich ausgewirkt + auf',[
   ['Hohe Mieten wirken sich auf Familien aus.','高租金会影响家庭。','High rents affect families.'],['Wie wirkt sich der Verkehr auf die Gesundheit aus?','交通如何影响健康？','How does traffic affect health?'],['Die neue Linie hat sich positiv auf das Viertel ausgewirkt.','新线路对街区产生了积极影响。','The new line had a positive effect on the district.']]),
  vocabWord('der Ballungsraum','大都市区；人口密集区','metropolitan area','die Ballungsräume · 阳性 / masculine',[
   ['Im Ballungsraum steigen die Mieten besonders stark.','大都市区的租金上涨尤其明显。','Rents are rising particularly sharply in metropolitan areas.'],['Viele Arbeitsplätze konzentrieren sich im Ballungsraum.','许多工作岗位集中在大都市区。','Many jobs are concentrated in the metropolitan area.'],['Der Ballungsraum braucht bessere Bahnverbindungen.','该大都市区需要更好的铁路连接。','The metropolitan area needs better rail connections.']])],
 'b2-debate':[
  vocabWord('das Argument','论点；理由','argument','die Argumente · 中性 / neuter',[
   ['Für diese Lösung sprechen mehrere Argumente.','有几个论点支持这一方案。','Several arguments support this solution.'],['Das Argument überzeugt mich nur teilweise.','这个论点只能部分说服我。','The argument convinces me only partly.'],['Bitte belegen Sie Ihr Argument mit einem Beispiel.','请用一个例子来支持您的论点。','Please support your argument with an example.']]),
  vocabWord('der Einwand','异议；反对意见','objection','die Einwände · 阳性 / masculine',[
   ['Gegen den Vorschlag gibt es einen wichtigen Einwand.','对该建议有一个重要异议。','There is one important objection to the proposal.'],['Diesen Einwand kann ich nachvollziehen.','我可以理解这一异议。','I can understand this objection.'],['Trotz einiger Einwände wurde die Maßnahme beschlossen.','尽管有一些反对意见，该措施仍获通过。','Despite some objections, the measure was adopted.']]),
  vocabWord('nachvollziehbar','可以理解的；合乎逻辑的','understandable; plausible','形容词 / adjective',[
   ['Ihre Sorge ist durchaus nachvollziehbar.','您的担忧完全可以理解。','Your concern is entirely understandable.'],['Die Entscheidung wurde nachvollziehbar begründet.','这一决定得到了合乎逻辑的解释。','The decision was explained plausibly.'],['Nicht alle Folgen sind sofort nachvollziehbar.','并非所有后果都能立即理解。','Not all consequences are immediately understandable.']]),
  vocabWord('widersprechen','反驳；不同意','to contradict; disagree','widerspricht · hat widersprochen + 第三格 / dative',[
   ['In diesem Punkt muss ich Ihnen widersprechen.','在这一点上我必须不同意您的看法。','I have to disagree with you on this point.'],['Die neuen Daten widersprechen dieser Annahme.','新数据与这一假设相矛盾。','The new data contradict this assumption.'],['Er widersprach höflich, aber deutlich.','他礼貌但明确地表示反对。','He disagreed politely but clearly.']]),
  vocabWord('zustimmen','同意；赞成','to agree','stimmt zu · hat zugestimmt + 第三格 / dative',[
   ['Ich kann Ihrem Vorschlag zustimmen.','我可以同意您的建议。','I can agree to your proposal.'],['Die Mehrheit hat der Maßnahme zugestimmt.','大多数人赞成该措施。','The majority approved the measure.'],['Ich stimme Ihnen grundsätzlich zu, allerdings fehlt Geld.','原则上我同意您，不过资金不足。','I agree with you in principle; however, funding is lacking.']]),
  vocabWord('voraussetzen','以……为前提；要求','to presuppose; require','setzt voraus · hat vorausgesetzt',[
   ['Diese Lösung setzt politische Unterstützung voraus.','这一方案需要政治支持。','This solution requires political support.'],['Gute Planung setzt verlässliche Daten voraus.','良好规划以可靠数据为前提。','Good planning presupposes reliable data.'],['Die Stelle setzt sehr gute Deutschkenntnisse voraus.','该职位要求很好的德语水平。','The position requires very good German.']]),
  vocabWord('die Maßnahme','措施','measure','die Maßnahmen · 阴性 / feminine',[
   ['Die Maßnahme soll den Verkehr reduzieren.','该措施旨在减少交通。','The measure is intended to reduce traffic.'],['Wir müssen die Wirkung der Maßnahmen prüfen.','我们必须检查这些措施的效果。','We need to examine the effect of the measures.'],['Kurzfristige Maßnahmen reichen allein nicht aus.','只有短期措施还不够。','Short-term measures alone are not sufficient.']]),
  vocabWord('langfristig','长期的；从长远看','long-term; in the long run','形容词／副词 / adjective/adverb',[
   ['Langfristig brauchen wir mehr Wohnraum.','从长远看，我们需要更多住房。','In the long run, we need more housing.'],['Die Investition ist langfristig sinnvoll.','从长期来看，这项投资是合理的。','The investment makes sense in the long term.'],['Eine langfristige Strategie verhindert kurzfristige Notlösungen.','长期战略能避免临时应急方案。','A long-term strategy prevents short-term stopgaps.']])]
};
for(const u of UNITS){
 const third=THIRD_EXAMPLES[u.id];
 if(third?.length!==u.words.length)throw new Error(`Invalid third-example set: ${u.id}`);
 u.words.forEach((word,index)=>word.push(...third[index]));
 const additions=VOCABULARY_EXPANSION[u.id];
 if(additions?.length!==8)throw new Error(`Invalid vocabulary expansion: ${u.id}`);
 u.words.push(...additions);
}

const OFFICIAL_MATERIALS={
 A1:{kind:'wordlist',title:['A1 官方词汇表','A1 official word list'],description:['29 页 · 基础词汇、主题与用法范围','29 pages · core vocabulary, themes and usage'],pages:29,file:'materials/goethe-a1-wortliste.pdf',official:'https://www.goethe.de/de/m/spr/prf/ueb/pa1.html'},
 A2:{kind:'wordlist',title:['A2 官方词汇表','A2 official word list'],description:['32 页 · A2 考试参考词汇','32 pages · A2 exam reference vocabulary'],pages:32,file:'materials/goethe-a2-wortliste.pdf',official:'https://www.goethe.de/ins/de/de/m/prf/prf/gzsd2/wi2.html'},
 B1:{kind:'wordlist',title:['B1 官方词汇表','B1 official word list'],description:['104 页 · 主题词汇与实际用法','104 pages · thematic vocabulary and practical use'],pages:104,file:'materials/goethe-b1-wortliste.pdf',official:'https://www.goethe.de/de/m/spr/prf/ueb/pb1.html'},
 B2:{kind:'practice',title:['B2 官方成人模考','B2 official adult model exam'],description:['51 页 · 听说读写四模块样题','51 pages · four-module model exam'],pages:51,file:'materials/goethe-b2-modellsatz.pdf',official:'https://www.goethe.de/de/m/spr/prf/ueb/pb2.html'}
};
const COURSE_SOURCES={
 A1:{kind:'wordlist',label:['歌德 A1 官方词汇范围','Goethe A1 official vocabulary scope'],...OFFICIAL_MATERIALS.A1},
 A2:{kind:'wordlist',label:['歌德 A2 官方词汇范围','Goethe A2 official vocabulary scope'],...OFFICIAL_MATERIALS.A2},
 B1:{kind:'wordlist',label:['歌德 B1 官方词汇范围','Goethe B1 official vocabulary scope'],...OFFICIAL_MATERIALS.B1},
 B2:{kind:'practice',label:['歌德 B2 官方模考主题与功能','Goethe B2 official model-exam themes & functions'],...OFFICIAL_MATERIALS.B2}
};
