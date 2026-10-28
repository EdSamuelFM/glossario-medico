import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  BookOpen, 
  Layers, 
  CheckCircle2, 
  XCircle, 
  Volume2, 
  Shuffle, 
  RotateCcw, 
  Search, 
  Filter, 
  Award, 
  Sparkles, 
  HelpCircle, 
  Edit3, 
  Brain, 
  ChevronLeft, 
  ChevronRight,
  Bookmark,
  Check,
  Zap,
  ArrowRight
} from 'lucide-react';

// --- DATASET: COMPLETE MEDICAL GLOSSARY EXTRACTED AND ENRICHED WITH DEFINITIONS ---
const GLOSSARY_DATA = [
  // Body Parts
  { english: "Chin", spanish: "Mentón/barbilla", portuguese: "Queixo", category: "Body Parts", definition: "Parte inferior do rosto, proeminência óssea abaixo da boca." },
  { english: "Forehead", spanish: "Frente", portuguese: "Testa / Fronte", category: "Body Parts", definition: "Parte superior do rosto localizada acima dos olhos e abaixo do cabelo." },
  { english: "Jaw", spanish: "Mandíbula", portuguese: "Mandíbula / Maxilar inferior", category: "Body Parts", definition: "Estrutura óssea que sustenta os dentes inferiores e permite a mastigação." },
  { english: "Abdominal Cavity", spanish: "Cavidad Abdominal", portuguese: "Cavidade Abdominal", category: "Body Parts", definition: "Espaço do corpo que contém órgãos como estômago, fígado, intestinos e rins." },
  { english: "Armpit", spanish: "Axila", portuguese: "Axila", category: "Body Parts", definition: "Cavidade abaixo da articulação do ombro onde o braço se conecta ao tronco." },
  { english: "Arms", spanish: "Brazos", portuguese: "Braços", category: "Body Parts", definition: "Membros superiores do corpo humano entre os ombros e os pulsos." },
  { english: "Belly", spanish: "Barriga / abdomen", portuguese: "Barriga / Abdômen", category: "Body Parts", definition: "Região ventral do corpo que abriga o estômago e órgãos digestivos." },
  { english: "Breast", spanish: "Seno, mama", portuguese: "Mama / Seio", category: "Body Parts", definition: "Órgãos glandulares mamários na região anterior do tórax." },
  { english: "Calf", spanish: "Pantorrilla", portuguese: "Panturrilha / Batata da perna", category: "Body Parts", definition: "Músculo posterior da perna situado entre o joelho e o tornozelo." },
  { english: "Chest", spanish: "Pecho", portuguese: "Peito / Tórax", category: "Body Parts", definition: "Região superior do tronco delimitada pelas costelas, contendo coração e pulmões." },
  { english: "Crotch", spanish: "Entrepierna", portuguese: "Virilha / Entreperna", category: "Body Parts", definition: "Região onde as pernas se juntam à base do tronco." },
  { english: "Eardrum", spanish: "Tímpano", portuguese: "Tímpano", category: "Body Parts", definition: "Membrana fina que separa o ouvido externo do ouvido médio e vibra com o som." },
  { english: "Earlobe", spanish: "Lóbulo de la oreja", portuguese: "Lóbulo da orelha", category: "Body Parts", definition: "Parte inferior macia e carnuda da orelha externa." },
  { english: "Feet", spanish: "Pies", portuguese: "Pés", category: "Body Parts", definition: "Extremidades inferiores das pernas que suportam o peso do corpo e permitem caminhar." },
  { english: "Fingers", spanish: "Dedos de la mano", portuguese: "Dedos da mão", category: "Body Parts", definition: "Extremidades articuladas das mãos usadas para agarrar e tato." },
  { english: "Fontanelle", spanish: "Fontanela / Mollera", portuguese: "Fontanela / Moleira", category: "Body Parts", definition: "Espaço membranoso mole na cabeça de bebês antes dos ossos do crânio se fundirem." },
  { english: "Crown of the head", spanish: "Coronilla", portuguese: "Alto da cabeça / coroa da cabeça", category: "Body Parts", definition: "Região mais alta da cabeça, situada no vértice do crânio." },
  { english: "Forearm", spanish: "Antebrazo", portuguese: "Antebraço", category: "Body Parts", definition: "Parte do membro superior localizada entre o cotovelo e o pulso." },
  { english: "Groin", spanish: "Ingle", portuguese: "Virilha", category: "Body Parts", definition: "Zona de junção entre a parte inferior do abdômen e as coxas." },
  { english: "Hip", spanish: "Cadera", portuguese: "Quadril", category: "Body Parts", definition: "Articulação coxofemoral que conecta as pernas à bacia." },
  { english: "Inner ear", spanish: "Oído interno", portuguese: "Ouvido interno", category: "Body Parts", definition: "Parte profunda do sistema auditivo responsável pela audição e equilíbrio (cóclea e labirinto)." },
  { english: "Knuckles", spanish: "Nudillos de los dedos", portuguese: "Nós dos dedos / Articulações dos dedos", category: "Body Parts", definition: "Articulações salientes formadas pelos ossos dos dedos dobrados." },
  { english: "Lap", spanish: "Regazo", portuguese: "Colo", category: "Body Parts", definition: "Área plana formada pelas coxas de uma pessoa sentada." },
  { english: "Legs", spanish: "Piernas", portuguese: "Pernas", category: "Body Parts", definition: "Membros inferiores usados para sustentação e locomoção." },
  { english: "Limbs", spanish: "Extremidades", portuguese: "Membros (Superiores/Inferiores)", category: "Body Parts", definition: "Braços e pernas ligados ao tronco do corpo." },
  { english: "Lower back", spanish: "Espalda baja", portuguese: "Lombar / Região lombar", category: "Body Parts", definition: "Parte inferior das costas situada acima da bacia." },
  { english: "Nape of the neck", spanish: "Nuca", portuguese: "Nuca", category: "Body Parts", definition: "Região posterior do pescoço abaixo da base do crânio." },
  { english: "Ossicles", spanish: "Huesecillos del oído", portuguese: "Ossículos do ouvido", category: "Body Parts", definition: "Três pequenos ossos no ouvido médio (martelo, bigorna e estribo) que transmitem o som." },
  { english: "Outer ear", spanish: "Oído externo", portuguese: "Ouvido externo", category: "Body Parts", definition: "Compreende o pavilhão auricular (orelha) e o canal auditivo externo." },
  { english: "Palm of the hand", spanish: "Palma de la mano", portuguese: "Palma da mão", category: "Body Parts", definition: "Superfície interior da mão entre o pulso e a base dos dedos." },
  { english: "Pelvis", spanish: "Pelvis", portuguese: "Pelve / Bacia", category: "Body Parts", definition: "Estrutura óssea na base da coluna vertebral que suporta a cavidade abdominal." },
  { english: "Pit of the stomach / Epigastrium", spanish: "Boca del estómago / Epigastrio", portuguese: "Boca do estômago / Epigástrio", category: "Body Parts", definition: "Região superior e central do abdômen, abaixo do esterno." },
  { english: "Shin", spanish: "Canilla / Espinilla", portuguese: "Canela", category: "Body Parts", definition: "Parte frontal da perna abaixo do joelho." },
  { english: "Sole / Bottom of the foot", spanish: "Planta del pie", portuguese: "Planta do pé", category: "Body Parts", definition: "Superfície inferior do pé que entra em contato com o chão." },
  { english: "Thigh", spanish: "Muslo", portuguese: "Coxa", category: "Body Parts", definition: "Região da perna localizada entre o quadril e o joelho." },
  { english: "Thumb", spanish: "Pulgar", portuguese: "Polegar", category: "Body Parts", definition: "Primeiro dedo da mão, oponível aos outros quatro." },
  { english: "Toes", spanish: "Dedos de los pies", portuguese: "Dedos do pé", category: "Body Parts", definition: "Dígitos articulados situados nas extremidades dos pés." },
  { english: "Upper back", spanish: "Espalda Superior", portuguese: "Parte superior das costas / Região torácica das costas", category: "Body Parts", definition: "Região das costas localizada entre o pescoço e a cintura." },
  { english: "Waist", spanish: "Cintura", portuguese: "Cintura", category: "Body Parts", definition: "Parte mais estreita do tronco humano, situada entre o tórax e o quadril." },

  // Brain & Nervous System
  { english: "Brain", spanish: "Cerebro", portuguese: "Cérebro", category: "Brain & Nervous System", definition: "Órgão central do sistema nervoso responsável pelo pensamento, memória e controle corporal." },
  { english: "Brainstem", spanish: "Tallo cerebral", portuguese: "Tronco encefálico", category: "Brain & Nervous System", definition: "Conecta o cérebro à coluna e controla funções vitais como respiração e batimentos cardíacos." },
  { english: "Central Nervous System (CNS)", spanish: "Sistema Nervioso Central", portuguese: "Sistema Nervoso Central (SNC)", category: "Brain & Nervous System", definition: "Composto pelo encéfalo e pela medula espinhal, processa todas as informações do corpo." },
  { english: "Cerebellum", spanish: "Cerebelo", portuguese: "Cerebelo", category: "Brain & Nervous System", definition: "Estrutura do cérebro responsável pelo equilíbrio, postura e coordenação motora fina." },
  { english: "Cerebral Cortex", spanish: "Corteza Cerebral", portuguese: "Córtex Cerebral", category: "Brain & Nervous System", definition: "Camada externa de tecido neural no cérebro envolvida na cognição e tomada de decisões." },
  { english: "Dura mater", spanish: "Duramadre", portuguese: "Dura-máter", category: "Brain & Nervous System", definition: "Meninge externa mais espessa e resistente que protege o cérebro e a medula espinhal." },
  { english: "Hemispheres", spanish: "Hemisferios", portuguese: "Hemisférios cerebrais", category: "Brain & Nervous System", definition: "As duas metades (esquerda e direita) do cérebro." },
  { english: "Nerves", spanish: "Nervios", portuguese: "Nervos", category: "Brain & Nervous System", definition: "Fibras tubulares que transmitem impulsos elétricos entre o cérebro e o resto do corpo." },
  { english: "Neurons", spanish: "Neuronas", portuguese: "Neurônios", category: "Brain & Nervous System", definition: "Células nervosas especializadas na transmissão de sinais elétricos e químicos." },
  { english: "Peripheral Nervous System", spanish: "Sistema Nervioso Periférico", portuguese: "Sistema Nervoso Periférico (SNP)", category: "Brain & Nervous System", definition: "Rede de nervos fora do SNC que conecta órgãos e membros ao cérebro." },
  { english: "Pituitary Gland", spanish: "Glándula Pituitaria", portuguese: "Glândula Pituitária / Hipófise", category: "Brain & Nervous System", definition: "Glândula mestre no cérebro que regula o sistema endócrino e hormônios de crescimento." },
  { english: "Spinal Cord", spanish: "Médula espinal", portuguese: "Medula espinhal", category: "Brain & Nervous System", definition: "Cordão de tecido nervoso dentro da coluna que conduz impulsos entre o cérebro e o corpo." },
  { english: "Spinal Fluid", spanish: "Líquido cefalorraquídeo", portuguese: "Líquido cefalorraquidiano (LCR) / Líquor", category: "Brain & Nervous System", definition: "Fluido claro que amortece e protege o cérebro e a medula contra impactos." },

  // Cardiovascular System
  { english: "Aorta", spanish: "Aorta", portuguese: "Aorta", category: "Cardiovascular System", definition: "Principal e maior artéria do corpo, levando sangue oxigenado do coração para os tecidos." },
  { english: "Arterial walls", spanish: "Paredes arteriales", portuguese: "Paredes arteriais", category: "Cardiovascular System", definition: "Camadas musculares e elásticas que revestem o interior e exterior das artérias." },
  { english: "Arteries", spanish: "Arterias", portuguese: "Artérias", category: "Cardiovascular System", definition: "Vasos sanguíneos flexíveis que transportam sangue oxigenado para fora do coração." },
  { english: "Atrium", spanish: "Aurícula", portuguese: "Átrio", category: "Cardiovascular System", definition: "Uma das duas câmaras superiores do coração que recebem sangue de retorno." },
  { english: "Blood vessels", spanish: "Vasos sanguíneos", portuguese: "Vasos sanguíneos", category: "Cardiovascular System", definition: "Tubos condutores (artérias, veias e capilares) pelos quais o sangue circula no corpo." },
  { english: "Erythrocytes (red blood cells)", spanish: "Eritrocitos (glóbulos rojos)", portuguese: "Eritrócitos / Glóbulos vermelhos", category: "Cardiovascular System", definition: "Células sanguíneas ricas em hemoglobina que transportam oxigênio para os tecidos." },
  { english: "Heart valve", spanish: "Válvula cardíaca", portuguese: "Válvula cardíaca", category: "Cardiovascular System", definition: "Estruturas que controlam o fluxo unidirecional de sangue entre as câmaras do coração." },
  { english: "Leukocytes (white blood cells)", spanish: "Leucocitos (glóbulos blancos)", portuguese: "Leucócitos / Glóbulos brancos", category: "Cardiovascular System", definition: "Células do sistema imunológico responsáveis por combater infecções e patógenos." },
  { english: "Myocardium", spanish: "Miocardio", portuguese: "Miocárdio", category: "Cardiovascular System", definition: "Camada muscular espessa responsável pela contração do coração." },
  { english: "Platelets / Thrombocytes", spanish: "Plaquetas / Trombocitos", portuguese: "Plaquetas / Trombócitos", category: "Cardiovascular System", definition: "Fragmentos celulares fundamentais para o processo de coagulação sanguínea." },
  { english: "Veins", spanish: "Venas", portuguese: "Veias", category: "Cardiovascular System", definition: "Vasos que levam sangue desoxigenado de volta dos tecidos para o coração." },
  { english: "Ventricles", spanish: "Ventrículos", portuguese: "Ventrículos", category: "Cardiovascular System", definition: "Câmaras inferiores do coração que bombeiam o sangue para os pulmões e corpo." },

  // Skeletal System
  { english: "Backbone / Spine", spanish: "Columna Vertebral", portuguese: "Coluna vertebral / Espinha", category: "Skeletal System", definition: "Série de vértebras sobrepostas que protegem a medula e dão suporte ao tronco." },
  { english: "Bone spur", spanish: "Espolón Óseo", portuguese: "Esporão ósseo / Osteófito", category: "Skeletal System", definition: "Crescimento ósseo anormal projetado na borda dos ossos ou articulações." },
  { english: "Cartilage", spanish: "Cartílago", portuguese: "Cartilagem", category: "Skeletal System", definition: "Tecido conjuntivo flexível que reduz o atrito entre articulações e ossos." },
  { english: "Collarbone / Clavicle", spanish: "Clavícula", portuguese: "Clavícula", category: "Skeletal System", definition: "Osso longo que conecta o esterno à escápula no topo do tórax." },
  { english: "Coccyx / Tailbone", spanish: "Coxis", portuguese: "Cóccix", category: "Skeletal System", definition: "Osso pequeno na extremidade inferior da coluna vertebral." },
  { english: "Cranium / Skull", spanish: "Cráneo", portuguese: "Crânio", category: "Skeletal System", definition: "Caixa óssea da cabeça que envolve e protege o cérebro." },
  { english: "Femur", spanish: "Fémur", portuguese: "Fêmur", category: "Skeletal System", definition: "Osso da coxa; é o maior, mais pesado e mais forte osso do corpo humano." },
  { english: "Fibula", spanish: "Peroné", portuguese: "Fíbula", category: "Skeletal System", definition: "Osso lateral mais fino situado na parte posterior da perna paralela à tíbia." },
  { english: "Kneecap / Patella", spanish: "Rótula", portuguese: "Rótula / Patela", category: "Skeletal System", definition: "Osso sesamóide pequeno e plano localizado na parte frontal da articulação do joelho." },
  { english: "Ribcage", spanish: "Caja torácica", portuguese: "Caixa torácica", category: "Skeletal System", definition: "Grade formada pelas costelas e esterno que protege o coração e pulmões." },
  { english: "Shoulder Blade / Scapula", spanish: "Omóplato", portuguese: "Escápula / Omoplata", category: "Skeletal System", definition: "Osso plano e triangular localizado na parte posterior do ombro." },
  { english: "Achilles Tendon", spanish: "Tendón de Aquiles", portuguese: "Tendão de Aquiles / Tendão calcâneo", category: "Skeletal System", definition: "Tendão espesso que conecta os músculos da panturrilha ao osso do calcanhar." },

  // Symptoms & Conditions
  { english: "Abscess", spanish: "Absceso", portuguese: "Abscesso", category: "Symptoms & Conditions", definition: "Acúmulo localizado de pus causado por infecção bacteriana." },
  { english: "Acid Reflux", spanish: "Reflujo ácido", portuguese: "Refluxo ácido / Refluxo gastroesofágico", category: "Symptoms & Conditions", definition: "Retorno do ácido gástrico do estômago para o esôfago provocando azia." },
  { english: "Bloating", spanish: "Hinchazón (estómago)", portuguese: "Inchaço / Distensão abdominal", category: "Symptoms & Conditions", definition: "Sensação de estômago estufado ou cheio por acúmulo de gases." },
  { english: "Blurry vision", spanish: "Visión borrosa", portuguese: "Visão embaçada / Visão turva", category: "Symptoms & Conditions", definition: "Perda da nitidez visual tornando a imagem sem foco." },
  { english: "Bruise", spanish: "Moretón", portuguese: "Hematoma / Mancha roxa", category: "Symptoms & Conditions", definition: "Marca na pele causada pelo rompimento de pequenos vasos após um trauma." },
  { english: "Burning Sensation", spanish: "Sensación de ardor", portuguese: "Sensação de queimação / Ardor", category: "Symptoms & Conditions", definition: "Sensação incômoda de calor/fogo na pele ou mucosas." },
  { english: "Chest pain", spanish: "Dolor en el pecho", portuguese: "Dor no peito / Dor torácica", category: "Symptoms & Conditions", definition: "Desconforto na região do tórax que pode indicar problemas cardíacos ou pulmonares." },
  { english: "Chills", spanish: "Escalofríos", portuguese: "Calafrios", category: "Symptoms & Conditions", definition: "Sensação de frio acompanhada de tremores involuntários do corpo." },
  { english: "Constipation", spanish: "Estreñimiento", portuguese: "Constipação / Prisão de ventre", category: "Symptoms & Conditions", definition: "Dificuldade ou evacuações intestinais infrequentes e endurecidas." },
  { english: "Difficulty breathing", spanish: "Dificultad para respirar", portuguese: "Dificuldade para respirar / Dispneia", category: "Symptoms & Conditions", definition: "Sensação de falta de ar ou respiração trabalhosa e pesada." },
  { english: "Dizziness / Lightheadedness", spanish: "Mareo / Aturdimiento", portuguese: "Tontura / Atordoamento", category: "Symptoms & Conditions", definition: "Sensação de instabilidade, vertigem ou sensação de desmaio iminente." },
  { english: "Fatigue", spanish: "Fatiga", portuguese: "Fadiga / Cansaço extremo", category: "Symptoms & Conditions", definition: "Sensação persistente de exaustão e falta de energia física ou mental." },
  { english: "Fever", spanish: "Fiebre", portuguese: "Febre", category: "Symptoms & Conditions", definition: "Elevação anormal da temperatura corporal acima dos 37.8°C." },
  { english: "High blood pressure", spanish: "Presión sanguínea alta", portuguese: "Pressão alta / Hipertensão", category: "Symptoms & Conditions", definition: "Força excessiva do sangue contra as paredes das artérias de forma crônica." },
  { english: "Itching", spanish: "Picazón, comezón", portuguese: "Coceira / Prurido", category: "Symptoms & Conditions", definition: "Sensação incômoda na pele que desperta a necessidade de coçar." },
  { english: "Nausea", spanish: "Náusea", portuguese: "Náusea / Enjoo", category: "Symptoms & Conditions", definition: "Sensação de desconforto gástrico acompanhada de vontade de vomitar." },
  { english: "Numbness", spanish: "Adormecimiento", portuguese: "Dormência", category: "Symptoms & Conditions", definition: "Perda parcial ou total de sensibilidade em alguma parte do corpo." },
  { english: "Rash", spanish: "Sarpullido", portuguese: "Erupção cutânea", category: "Symptoms & Conditions", definition: "Alteração na cor ou textura da pele com vermelhidão e irritação." },
  { english: "Shortness of breath", spanish: "Falta de aliento", portuguese: "Falta de ar", category: "Symptoms & Conditions", definition: "Sensação desconfortável de não conseguir inspirar ar suficiente." },
  { english: "Sore throat", spanish: "Dolor en la garganta", portuguese: "Dor de garganta", category: "Symptoms & Conditions", definition: "Dor, irritação ou sensação de arranhão na região da faringe." },
  { english: "Swelling", spanish: "Hinchazón", portuguese: "Inchaço / Edema", category: "Symptoms & Conditions", definition: "Aumento de volume de uma parte do corpo por acúmulo de líquidos." },
  { english: "Tingling", spanish: "Hormigueo", portuguese: "Formigamento / Parestesia", category: "Symptoms & Conditions", definition: "Sensação desagradável de agulhadas ou alfinetadas na pele." },

  // Types of Pain
  { english: "Achy pain", spanish: "Dolor sordo y persistente", portuguese: "Dor contínua e incômoda", category: "Types of Pain", definition: "Dor constante de baixa ou média intensidade, parecida com dor muscular." },
  { english: "Acute Pain", spanish: "Dolor agudo", portuguese: "Dor aguda", category: "Types of Pain", definition: "Dor súbita e intensa de curta duração que sinaliza lesão corporal recente." },
  { english: "Burning Pain", spanish: "Dolor ardiente", portuguese: "Dor em queimação", category: "Types of Pain", definition: "Sensação dolorosa acompanhada de ardor ardente, comum em lesões de nervos." },
  { english: "Chronic Pain", spanish: "Dolor crónico", portuguese: "Dor crônica", category: "Types of Pain", definition: "Dor persistente que dura meses ou anos além do tempo normal de cura." },
  { english: "Dull pain", spanish: "Dolor sordo", portuguese: "Dor surda", category: "Types of Pain", definition: "Dor difusa e constante que não é afiada nem pontual." },
  { english: "Excruciating Pain", spanish: "Dolor insoportable", portuguese: "Dor insuportável / Atroz", category: "Types of Pain", definition: "Nível extremo de dor de altíssima intensidade que incapacita a pessoa." },
  { english: "Sharp Pain", spanish: "Dolor agudo", portuguese: "Dor aguda / Dor em pontada", category: "Types of Pain", definition: "Dor repentina e localizada que simula um corte ou picada forte." },
  { english: "Stabbing Pain", spanish: "Dolor Punzante", portuguese: "Dor em pontada", category: "Types of Pain", definition: "Sensação de dor rápida e penetrante como uma facada." },
  { english: "Throbbing pain", spanish: "Dolor pulsante / palpitante", portuguese: "Dor pulsátil / Dor latejante", category: "Types of Pain", definition: "Dor que rítmicamente aumenta e diminui no ritmo dos batimentos cardíacos." },

  // Medical Supplies
  { english: "Bandage", spanish: "Vendaje", portuguese: "Atadura / Atadura de gaze", category: "Medical Supplies", definition: "Faixa de tecido usada para cobrir feridas ou imobilizar membros." },
  { english: "Blood pressure cuff", spanish: "Manga para tomar la presión arterial", portuguese: "Braçadeira de esfigmomanômetro", category: "Medical Supplies", definition: "Manguito inflável colocado no braço para aferir a pressão arterial." },
  { english: "Cane", spanish: "Bastón", portuguese: "Bengala", category: "Medical Supplies", definition: "Dispositivo de apoio portátil de haste única para auxílio ao caminhar." },
  { english: "Cast", spanish: "Yeso", portuguese: "Gesso ortopédico", category: "Medical Supplies", definition: "Estrutura rígida de gesso ou fibra mantida para imobilizar ossos fraturados." },
  { english: "Catheter", spanish: "Catéter", portuguese: "Cateter / Sonda", category: "Medical Supplies", definition: "Tubo fino flexível inserido no corpo para drenar fluidos ou injetar remédios." },
  { english: "Crutches", spanish: "Muletas", portuguese: "Muletas", category: "Medical Supplies", definition: "Hastes verticais de apoio sob os braços para auxiliar pessoas com lesões nos pés/pernas." },
  { english: "Gauze", spanish: "Gaza", portuguese: "Gaze", category: "Medical Supplies", definition: "Tecido fino e poroso absorvente usado para cobrir e limpar ferimentos." },
  { english: "IV Fluids", spanish: "Líquidos intravenosos", portuguese: "Soro / Fluidos Intravenosos", category: "Medical Supplies", definition: "Soluções salinas ou glicosadas administradas diretamente na veia." },
  { english: "Scalpel", spanish: "Bisturí / escalpelo", portuguese: "Bisturi", category: "Medical Supplies", definition: "Lâmina cirúrgica de alta precisão usada para realizar incisões." },
  { english: "Stethoscope", spanish: "Estetoscopio", portuguese: "Estetoscópio", category: "Medical Supplies", definition: "Instrumento médico acústico para auscultar os sons internos do coração e pulmões." },
  { english: "Syringe", spanish: "Jeringa", portuguese: "Seringa", category: "Medical Supplies", definition: "Dispositivo cilíndrico graduado com êmbolo para injeção ou aspiração de líquidos." },
  { english: "Wheelchair", spanish: "Silla de ruedas", portuguese: "Cadeira de rodas", category: "Medical Supplies", definition: "Cadeira montada sobre rodas para mobilidade de pessoas incapacitadas de andar." },

  // Diseases & Conditions
  { english: "Alzheimer's Disease", spanish: "Enfermedad de Alzheimer", portuguese: "Doença de Alzheimer", category: "Diseases & Conditions", definition: "Transtorno neurodegenerativo progressivo que causa perda de memória e declínio cognitivo." },
  { english: "Anemia", spanish: "Anemia", portuguese: "Anemia", category: "Diseases & Conditions", definition: "Redução do número de glóbulos vermelhos ou hemoglobina no sangue." },
  { english: "Asthma", spanish: "Asma", portuguese: "Asma", category: "Diseases & Conditions", definition: "Condição crônica das vias aéreas que causa inflamação e estreitamento bronquial." },
  { english: "Diabetes", spanish: "Diabetes", portuguese: "Diabetes Mellitus", category: "Diseases & Conditions", definition: "Doença metabólica caracterizada por altos níveis de glicose no sangue." },
  { english: "Hepatitis", spanish: "Hepatitis", portuguese: "Hepatite", category: "Diseases & Conditions", definition: "Inflamação do fígado geralmente causada por infecção viral ou toxinas." },
  { english: "Pneumonia", spanish: "Pulmonía / Neumonía", portuguese: "Pneumonia", category: "Diseases & Conditions", definition: "Infecção pulmonar que inflama os alvéolos, enchendo-os de líquido ou pus." },
  { english: "Stroke", spanish: "Derrame cerebral / ACV", portuguese: "Acidente Vascular Cerebral (AVC) / Derrame", category: "Diseases & Conditions", definition: "Interrupção do fluxo sanguíneo para o cérebro que causa morte celular." },
  { english: "Tuberculosis", spanish: "Tuberculosis", portuguese: "Tuberculose", category: "Diseases & Conditions", definition: "Infecção bacteriana contagiosa que afeta principalmente os pulmões." },

  // Acronyms
  { english: "AIDS", spanish: "SIDA (Síndrome de Inmunodeficiencia Adquirida)", portuguese: "AIDS / SIDA (Síndrome da Imunodeficiência Adquirida)", category: "Acronyms", definition: "Estágio avançado da infecção pelo vírus HIV que compromete o sistema imunológico." },
  { english: "BMI", spanish: "IMC (Índice de masa corporal)", portuguese: "IMC (Índice de Massa Corporal)", category: "Acronyms", definition: "Cálculo de relação entre peso e altura para avaliar se o peso está ideal." },
  { english: "CBC", spanish: "Conteo sanguíneo completo / Hemograma", portuguese: "Hemograma Completo", category: "Acronyms", definition: "Exame de sangue detalhado que avalia leucócitos, hemácias e plaquetas." },
  { english: "CT scan / CAT Scan", spanish: "Tomografía Computarizada", portuguese: "Tomografia Computadorizada (TC)", category: "Acronyms", definition: "Exame de imagem detalhado que usa raios-X em fatias seccionais." },
  { english: "ECG / EKG", spanish: "Electrocardiograma", portuguese: "Eletrocardiograma (ECG)", category: "Acronyms", definition: "Registro gráfico da atividade elétrica cardíaca para detectar anomalias no ritmo." },
  { english: "ICU", spanish: "Unidad de Cuidados Intensivos (UCI)", portuguese: "UTI (Unidade de Terapia Intensiva)", category: "Acronyms", definition: "Setor hospitalar especializado no atendimento continuado a pacientes em estado grave." },
  { english: "MRI", spanish: "Resonancia Magnética", portuguese: "Ressonância Magnética (RMN)", category: "Acronyms", definition: "Técnica de imagem médica usando campos magnéticos intensos para mapear tecidos." },

  // Body Parts — termos adicionados do MedicalGlossary.pdf
  { english: "Lower belly", spanish: "Parte inferior del abdomen", portuguese: "Parte inferior do abdome", category: "Body Parts", definition: "Região do abdome situada abaixo do umbigo." },
  { english: "Middle ear", spanish: "Oído medio", portuguese: "Ouvido médio", category: "Body Parts", definition: "Parte do ouvido entre o tímpano e o ouvido interno." },
  // Cardiovascular System — termos adicionados do MedicalGlossary.pdf
  { english: "Serum (blood)", spanish: "Suero sanguíneo", portuguese: "Soro sanguíneo", category: "Cardiovascular System", definition: "Parte líquida do sangue que permanece após a coagulação." },
  // Skeletal System — termos adicionados do MedicalGlossary.pdf
  { english: "Arch of the foot", spanish: "Arco del pie", portuguese: "Arco do pé", category: "Skeletal System", definition: "Curvatura formada pelos ossos e tecidos na parte inferior do pé." },
  { english: "Cervicals", spanish: "Vértebras cervicales", portuguese: "Vértebras cervicais", category: "Skeletal System", definition: "Vértebras localizadas no pescoço, na parte superior da coluna vertebral." },
  { english: "Instep", spanish: "Empeine", portuguese: "Peito do pé", category: "Skeletal System", definition: "Parte superior e arqueada do pé, entre os dedos e o tornozelo." },
  { english: "Heel bone", spanish: "Hueso del talón", portuguese: "Osso do calcanhar", category: "Skeletal System", definition: "Osso chamado calcâneo, que forma a base do calcanhar." },
  { english: "Hip bone", spanish: "Hueso de la cadera", portuguese: "Osso do quadril", category: "Skeletal System", definition: "Osso que forma parte da pelve e se articula com o sacro." },
  { english: "Intervertebral disks", spanish: "Discos intervertebrales", portuguese: "Discos intervertebrais", category: "Skeletal System", definition: "Estruturas de fibrocartilagem entre as vértebras que amortecem impactos." },
  { english: "Lumbar area", spanish: "Región lumbar", portuguese: "Região lombar", category: "Skeletal System", definition: "Parte inferior das costas, correspondente às vértebras lombares." },
  { english: "Pelvic bone", spanish: "Hueso pélvico", portuguese: "Osso pélvico", category: "Skeletal System", definition: "Osso que integra a estrutura óssea da pelve." },
  { english: "Phalanges", spanish: "Falanges", portuguese: "Falanges", category: "Skeletal System", definition: "Ossos que formam os dedos das mãos e dos pés." },
  { english: "Radius/Ulna", spanish: "Radio/cúbito", portuguese: "Rádio/ulna", category: "Skeletal System", definition: "O rádio e a ulna são os dois ossos do antebraço." },
  { english: "Ribs", spanish: "Costillas", portuguese: "Costelas", category: "Skeletal System", definition: "Ossos que formam a caixa torácica e protegem órgãos do tórax." },
  { english: "Rotator cuff", spanish: "Manguito rotador", portuguese: "Manguito rotador", category: "Skeletal System", definition: "Conjunto de músculos e tendões que estabiliza e movimenta o ombro." },
  { english: "Sternum", spanish: "Esternón", portuguese: "Esterno", category: "Skeletal System", definition: "Osso plano situado na parte anterior do tórax, ao qual se ligam costelas." },
  { english: "Tibia", spanish: "Tibia", portuguese: "Tíbia", category: "Skeletal System", definition: "Osso longo da perna, localizado entre o joelho e o tornozelo." },
  { english: "Ulna", spanish: "Cúbito", portuguese: "Ulna", category: "Skeletal System", definition: "Osso do antebraço situado no lado do dedo mínimo." },
  { english: "Ankle", spanish: "Tobillo", portuguese: "Tornozelo", category: "Skeletal System", definition: "Articulação que conecta a perna ao pé." },
  // Lymphatic System — termos adicionados do MedicalGlossary.pdf
  { english: "Adenoids", spanish: "Adenoides", portuguese: "Adenoides", category: "Lymphatic System", definition: "Tecido linfoide localizado atrás do nariz, na parte superior da garganta." },
  { english: "Antibodies", spanish: "Anticuerpos", portuguese: "Anticorpos", category: "Lymphatic System", definition: "Proteínas produzidas pelo sistema imune que reconhecem substâncias estranhas." },
  { english: "Appendix", spanish: "Apéndice", portuguese: "Apêndice", category: "Lymphatic System", definition: "Pequena estrutura tubular ligada ao início do intestino grosso." },
  { english: "Bone marrow", spanish: "Médula ósea", portuguese: "Medula óssea", category: "Lymphatic System", definition: "Tecido dentro de certos ossos que produz células sanguíneas." },
  { english: "Lymph nodes", spanish: "Ganglios linfáticos", portuguese: "Linfonodos", category: "Lymphatic System", definition: "Pequenas estruturas que filtram a linfa e abrigam células de defesa." },
  { english: "Spleen", spanish: "Bazo", portuguese: "Baço", category: "Lymphatic System", definition: "Órgão que filtra o sangue e participa da resposta imune." },
  { english: "Tonsils", spanish: "Amígdalas", portuguese: "Amígdalas", category: "Lymphatic System", definition: "Massas de tecido linfoide na garganta que ajudam na defesa contra microrganismos." },
  // Male Reproductive System — termos adicionados do MedicalGlossary.pdf
  { english: "Penis", spanish: "Pene", portuguese: "Pênis", category: "Male Reproductive System", definition: "Órgão genital externo masculino, utilizado na micção e na reprodução." },
  { english: "Prostate", spanish: "Próstata", portuguese: "Próstata", category: "Male Reproductive System", definition: "Glândula que produz parte do líquido que compõe o sêmen." },
  { english: "Scrotum", spanish: "Escroto", portuguese: "Escroto", category: "Male Reproductive System", definition: "Bolsa de pele que contém os testículos." },
  { english: "Sperm", spanish: "Espermatozoide", portuguese: "Espermatozoide", category: "Male Reproductive System", definition: "Célula reprodutiva masculina que pode fecundar o óvulo." },
  { english: "Testicles", spanish: "Testículos", portuguese: "Testículos", category: "Male Reproductive System", definition: "Órgãos que produzem espermatozoides e hormônios sexuais masculinos." },
  { english: "Epididymis", spanish: "Epidídimo", portuguese: "Epidídimo", category: "Male Reproductive System", definition: "Estrutura onde os espermatozoides amadurecem e ficam armazenados." },
  { english: "Foreskin", spanish: "Prepucio", portuguese: "Prepúcio", category: "Male Reproductive System", definition: "Dobra de pele que recobre a glande do pênis." },
  // Female Reproductive System — termos adicionados do MedicalGlossary.pdf
  { english: "Birth Canal", spanish: "Canal del parto", portuguese: "Canal do parto", category: "Female Reproductive System", definition: "Passagem pela qual o bebê nasce durante o parto vaginal." },
  { english: "Cervix", spanish: "Cuello uterino", portuguese: "Colo do útero", category: "Female Reproductive System", definition: "Parte inferior e estreita do útero, que se comunica com a vagina." },
  { english: "Clitoris", spanish: "Clítoris", portuguese: "Clitóris", category: "Female Reproductive System", definition: "Órgão genital externo com muitas terminações nervosas, relacionado ao prazer sexual." },
  { english: "Eggs", spanish: "Óvulos", portuguese: "Óvulos", category: "Female Reproductive System", definition: "Células reprodutivas femininas produzidas pelos ovários." },
  { english: "Endometrium", spanish: "Endometrio", portuguese: "Endométrio", category: "Female Reproductive System", definition: "Camada interna do útero, que muda ao longo do ciclo menstrual." },
  { english: "Fallopian Tubes", spanish: "Trompas de Falopio", portuguese: "Tubas uterinas", category: "Female Reproductive System", definition: "Canais que ligam os ovários ao útero e transportam o óvulo." },
  { english: "Fundus", spanish: "Fondo uterino", portuguese: "Fundo do útero", category: "Female Reproductive System", definition: "Parte superior e arredondada do útero." },
  { english: "Ovaries", spanish: "Ovarios", portuguese: "Ovários", category: "Female Reproductive System", definition: "Órgãos que produzem óvulos e hormônios sexuais." },
  { english: "Uterine Lining", spanish: "Revestimiento uterino", portuguese: "Revestimento uterino", category: "Female Reproductive System", definition: "Tecido que reveste o interior do útero, formado principalmente pelo endométrio." },
  { english: "Uterus", spanish: "Útero", portuguese: "Útero", category: "Female Reproductive System", definition: "Órgão muscular onde o embrião pode se desenvolver durante a gestação." },
  { english: "Vagina", spanish: "Vagina", portuguese: "Vagina", category: "Female Reproductive System", definition: "Canal muscular que liga o colo do útero à parte externa do corpo." },
  { english: "Womb", spanish: "Útero", portuguese: "Útero", category: "Female Reproductive System", definition: "Órgão muscular que abriga o desenvolvimento do embrião e do feto." },
  { english: "Placenta", spanish: "Placenta", portuguese: "Placenta", category: "Female Reproductive System", definition: "Órgão temporário que permite trocas de nutrientes, gases e resíduos entre gestante e feto." },
  // Digestive System — termos adicionados do MedicalGlossary.pdf
  { english: "Anus", spanish: "Ano", portuguese: "Ânus", category: "Digestive System", definition: "Abertura final do trato digestivo, por onde as fezes são eliminadas." },
  { english: "Ascending Colon", spanish: "Colon ascendente", portuguese: "Cólon ascendente", category: "Digestive System", definition: "Trecho do intestino grosso que sobe pelo lado direito do abdome." },
  { english: "Bile", spanish: "Bilis", portuguese: "Bile", category: "Digestive System", definition: "Líquido produzido pelo fígado que auxilia na digestão das gorduras." },
  { english: "Biliary Duct", spanish: "Conducto biliar", portuguese: "Ducto biliar", category: "Digestive System", definition: "Canal que transporta a bile do fígado e da vesícula biliar ao intestino." },
  { english: "Bowels", spanish: "Intestinos", portuguese: "Intestinos", category: "Digestive System", definition: "Partes do trato digestivo que absorvem nutrientes e conduzem resíduos." },
  { english: "Cecum", spanish: "Ciego", portuguese: "Ceco", category: "Digestive System", definition: "Primeira porção do intestino grosso, situada junto ao intestino delgado." },
  { english: "Colon", spanish: "Colon", portuguese: "Cólon", category: "Digestive System", definition: "Parte do intestino grosso que absorve água e forma as fezes." },
  { english: "Descending Colon", spanish: "Colon descendente", portuguese: "Cólon descendente", category: "Digestive System", definition: "Trecho do intestino grosso que desce pelo lado esquerdo do abdome." },
  { english: "Digestive Tube", spanish: "Tubo digestivo", portuguese: "Tubo digestório", category: "Digestive System", definition: "Conjunto de órgãos em forma de tubo por onde os alimentos passam e são digeridos." },
  { english: "Duodenum", spanish: "Duodeno", portuguese: "Duodeno", category: "Digestive System", definition: "Primeira parte do intestino delgado, que recebe o conteúdo do estômago." },
  { english: "Enzymes", spanish: "Enzimas", portuguese: "Enzimas", category: "Digestive System", definition: "Proteínas que aceleram reações químicas, incluindo processos da digestão." },
  { english: "Esophagus", spanish: "Esófago", portuguese: "Esôfago", category: "Digestive System", definition: "Tubo muscular que conduz alimentos da garganta ao estômago." },
  { english: "Gallbladder", spanish: "Vesícula biliar", portuguese: "Vesícula biliar", category: "Digestive System", definition: "Órgão que armazena e concentra a bile produzida pelo fígado." },
  { english: "Gallstones", spanish: "Cálculos biliares", portuguese: "Cálculos biliares", category: "Digestive System", definition: "Depósitos endurecidos que se formam na vesícula biliar ou nas vias biliares." },
  { english: "Gastric Mucosa", spanish: "Mucosa gástrica", portuguese: "Mucosa gástrica", category: "Digestive System", definition: "Revestimento interno do estômago, que produz secreções e protege a parede do órgão." },
  { english: "Large Intestine", spanish: "Intestino grueso", portuguese: "Intestino grosso", category: "Digestive System", definition: "Parte do sistema digestório que absorve água e forma as fezes." },
  { english: "Liver", spanish: "Hígado", portuguese: "Fígado", category: "Digestive System", definition: "Órgão que processa nutrientes, produz bile e participa da desintoxicação do organismo." },
  { english: "Liver enzymes", spanish: "Enzimas hepáticas", portuguese: "Enzimas hepáticas", category: "Digestive System", definition: "Proteínas produzidas principalmente pelo fígado que facilitam reações químicas no organismo." },
  { english: "Pancreas", spanish: "Páncreas", portuguese: "Pâncreas", category: "Digestive System", definition: "Órgão que produz enzimas digestivas e hormônios como insulina e glucagon." },
  { english: "Parotid glands", spanish: "Glándulas parótidas", portuguese: "Glândulas parótidas", category: "Digestive System", definition: "Glândulas salivares situadas diante das orelhas, responsáveis pela produção de saliva." },
  { english: "Rectum", spanish: "Recto", portuguese: "Reto", category: "Digestive System", definition: "Porção final do intestino grosso, onde as fezes ficam antes da evacuação." },
  { english: "Saliva", spanish: "Saliva", portuguese: "Saliva", category: "Digestive System", definition: "Líquido produzido pelas glândulas salivares que umedece os alimentos e inicia a digestão." },
  { english: "Sigmoid", spanish: "Colon sigmoide", portuguese: "Cólon sigmoide", category: "Digestive System", definition: "Trecho curvo do intestino grosso que liga o cólon descendente ao reto." },
  { english: "Small Intestine", spanish: "Intestino delgado", portuguese: "Intestino delgado", category: "Digestive System", definition: "Parte do sistema digestório onde ocorre a maior parte da digestão e absorção de nutrientes." },
  { english: "Sphincter", spanish: "Esfínter", portuguese: "Esfíncter", category: "Digestive System", definition: "Músculo circular que controla a abertura e o fechamento de uma passagem corporal." },
  { english: "Stomach", spanish: "Estómago", portuguese: "Estômago", category: "Digestive System", definition: "Órgão que armazena e mistura os alimentos com secreções digestivas." },
  { english: "Stomach Acid", spanish: "Ácido gástrico", portuguese: "Ácido gástrico", category: "Digestive System", definition: "Componente ácido do suco gástrico que ajuda a digerir alimentos e eliminar microrganismos." },
  { english: "Transverse Colon", spanish: "Colon transverso", portuguese: "Cólon transverso", category: "Digestive System", definition: "Porção do intestino grosso que atravessa o abdome da direita para a esquerda." },
  // Head & Respiratory System — termos adicionados do MedicalGlossary.pdf
  { english: "Adam's Apple", spanish: "Nuez de Adán", portuguese: "Pomo de Adão", category: "Head & Respiratory System", definition: "Proeminência da cartilagem tireóidea na parte anterior do pescoço." },
  { english: "Airways", spanish: "Vías respiratorias", portuguese: "Vias respiratórias", category: "Head & Respiratory System", definition: "Conjunto de estruturas que conduzem o ar entre o ambiente e os pulmões." },
  { english: "Alveoli", spanish: "Alvéolos", portuguese: "Alvéolos", category: "Head & Respiratory System", definition: "Pequenas bolsas pulmonares onde ocorrem as trocas de oxigênio e dióxido de carbono." },
  { english: "Bronchioles", spanish: "Bronquiolos", portuguese: "Bronquíolos", category: "Head & Respiratory System", definition: "Pequenos ramos dos brônquios que conduzem o ar até os alvéolos." },
  { english: "Bronchi", spanish: "Bronquios", portuguese: "Brônquios", category: "Head & Respiratory System", definition: "Duas ramificações principais da traqueia que conduzem o ar aos pulmões." },
  { english: "Larynx/voice box", spanish: "Laringe", portuguese: "Laringe", category: "Head & Respiratory System", definition: "Estrutura da garganta que contém as pregas vocais e conduz o ar à traqueia." },
  { english: "Nasal Cavity", spanish: "Cavidad nasal", portuguese: "Cavidade nasal", category: "Head & Respiratory System", definition: "Espaço interno do nariz que filtra, aquece e umidifica o ar inspirado." },
  { english: "Nasal Mucosa (lining)", spanish: "Mucosa nasal", portuguese: "Mucosa nasal", category: "Head & Respiratory System", definition: "Tecido que reveste a cavidade nasal e ajuda a filtrar e umidificar o ar." },
  { english: "Nasal Passages", spanish: "Fosas nasales", portuguese: "Passagens nasais", category: "Head & Respiratory System", definition: "Canais internos do nariz por onde o ar passa durante a respiração." },
  { english: "Nostrils/Nares", spanish: "Narinas", portuguese: "Narinas", category: "Head & Respiratory System", definition: "Aberturas externas do nariz que permitem a entrada e a saída de ar." },
  { english: "Pharynx", spanish: "Faringe", portuguese: "Faringe", category: "Head & Respiratory System", definition: "Canal que liga as cavidades nasal e oral à laringe e ao esôfago." },
  { english: "Sinuses", spanish: "Senos paranasales", portuguese: "Seios paranasais", category: "Head & Respiratory System", definition: "Cavidades cheias de ar nos ossos ao redor do nariz, revestidas por mucosa." },
  { english: "Temples", spanish: "Sienes", portuguese: "Têmporas", category: "Head & Respiratory System", definition: "Regiões laterais da cabeça situadas entre a testa e as orelhas." },
  { english: "Vocal Cords", spanish: "Cuerdas vocales", portuguese: "Pregas vocais", category: "Head & Respiratory System", definition: "Estruturas da laringe que vibram para produzir a voz." },
  { english: "Windpipe/ Trachea", spanish: "Tráquea", portuguese: "Traqueia", category: "Head & Respiratory System", definition: "Tubo que conduz o ar da laringe aos brônquios." },
  // Endocrine System — termos adicionados do MedicalGlossary.pdf
  { english: "Adrenal glands", spanish: "Glándulas suprarrenales", portuguese: "Glândulas suprarrenais", category: "Endocrine System", definition: "Glândulas situadas acima dos rins que produzem hormônios como cortisol e adrenalina." },
  { english: "Hypothalamus", spanish: "Hipotálamo", portuguese: "Hipotálamo", category: "Endocrine System", definition: "Região do cérebro que regula funções hormonais, temperatura corporal, fome e sede." },
  { english: "Parathyroid", spanish: "Glándula paratiroides", portuguese: "Glândula paratireoide", category: "Endocrine System", definition: "Pequenas glândulas que produzem hormônio responsável por regular o cálcio no sangue." },
  { english: "Thyroid Gland", spanish: "Glándula tiroides", portuguese: "Glândula tireoide", category: "Endocrine System", definition: "Glândula do pescoço que produz hormônios que regulam o metabolismo." },
  // Hormones & Neurotransmitters — termos adicionados do MedicalGlossary.pdf
  { english: "Progesterone", spanish: "Progesterona", portuguese: "Progesterona", category: "Hormones & Neurotransmitters", definition: "Hormônio envolvido no ciclo menstrual e na manutenção da gestação." },
  { english: "Estrogen", spanish: "Estrógeno", portuguese: "Estrogênio", category: "Hormones & Neurotransmitters", definition: "Grupo de hormônios que participa do desenvolvimento sexual e da regulação do ciclo menstrual." },
  { english: "Testosterone", spanish: "Testosterona", portuguese: "Testosterona", category: "Hormones & Neurotransmitters", definition: "Hormônio sexual que participa do desenvolvimento de características sexuais e da produção de espermatozoides." },
  { english: "Adrenaline", spanish: "Adrenalina", portuguese: "Adrenalina", category: "Hormones & Neurotransmitters", definition: "Hormônio que prepara o organismo para responder a situações de estresse ou perigo." },
  { english: "Cortisol", spanish: "Cortisol", portuguese: "Cortisol", category: "Hormones & Neurotransmitters", definition: "Hormônio produzido pelas glândulas suprarrenais que participa da resposta ao estresse." },
  { english: "Human growth hormone- HGH", spanish: "Hormona del crecimiento humano - HGH", portuguese: "Hormônio do crescimento humano - HGH", category: "Hormones & Neurotransmitters", definition: "Hormônio produzido pela hipófise que estimula o crescimento e influencia o metabolismo." },
  { english: "Insulin", spanish: "Insulina", portuguese: "Insulina", category: "Hormones & Neurotransmitters", definition: "Hormônio que ajuda a glicose a entrar nas células e regula sua concentração no sangue." },
  { english: "Neurotransmitter", spanish: "Neurotransmisor", portuguese: "Neurotransmissor", category: "Hormones & Neurotransmitters", definition: "Substância química que transmite sinais entre neurônios ou entre neurônios e outras células." },
  { english: "Prolactin", spanish: "Prolactina", portuguese: "Prolactina", category: "Hormones & Neurotransmitters", definition: "Hormônio produzido pela hipófise que estimula a produção de leite." },
  // Specialties & Facilities — termos adicionados do MedicalGlossary.pdf
  { english: "Allergology", spanish: "Alergología", portuguese: "Alergologia", category: "Specialties & Facilities", definition: "Especialidade médica dedicada ao estudo e cuidado das alergias." },
  { english: "Anesthesiology", spanish: "Anestesiología", portuguese: "Anestesiologia", category: "Specialties & Facilities", definition: "Especialidade médica que cuida da anestesia e do controle da dor em procedimentos." },
  { english: "Audiology", spanish: "Audiología", portuguese: "Audiologia", category: "Specialties & Facilities", definition: "Área da saúde que avalia a audição e o equilíbrio." },
  { english: "Cardiology", spanish: "Cardiología", portuguese: "Cardiologia", category: "Specialties & Facilities", definition: "Especialidade médica dedicada ao coração e ao sistema circulatório." },
  { english: "Dentistry / Odontology", spanish: "Odontología", portuguese: "Odontologia", category: "Specialties & Facilities", definition: "Área da saúde dedicada à prevenção e ao cuidado dos dentes e da boca." },
  { english: "Emergency Room - ER", spanish: "Sala de urgencias - ER", portuguese: "Pronto-socorro - ER", category: "Specialties & Facilities", definition: "Setor hospitalar que atende pessoas com problemas de saúde urgentes." },
  { english: "Endocrinology", spanish: "Endocrinología", portuguese: "Endocrinologia", category: "Specialties & Facilities", definition: "Especialidade médica que estuda e trata as glândulas e os hormônios." },
  { english: "ENT Department", spanish: "Departamento de otorrinolaringología", portuguese: "Departamento de otorrinolaringologia", category: "Specialties & Facilities", definition: "Setor que atende problemas do ouvido, nariz e garganta." },
  { english: "Facility", spanish: "Establecimiento de salud", portuguese: "Estabelecimento de saúde", category: "Specialties & Facilities", definition: "Local onde são oferecidos serviços de saúde, como consultas ou exames." },
  { english: "Family Planning", spanish: "Planificación familiar", portuguese: "Planejamento familiar", category: "Specialties & Facilities", definition: "Serviços e informações sobre reprodução, contracepção e planejamento de gestações." },
  { english: "Front desk", spanish: "Recepción", portuguese: "Recepção", category: "Specialties & Facilities", definition: "Área que recebe e orienta as pessoas que chegam a um estabelecimento." },
  { english: "Genetics", spanish: "Genética", portuguese: "Genética", category: "Specialties & Facilities", definition: "Área que estuda os genes, a hereditariedade e suas relações com a saúde." },
  { english: "Geriatrics", spanish: "Geriatría", portuguese: "Geriatria", category: "Specialties & Facilities", definition: "Especialidade médica dedicada à saúde e ao cuidado de pessoas idosas." },
  { english: "GI Department/ Gastroenterology", spanish: "Departamento de gastroenterología", portuguese: "Departamento de gastroenterologia", category: "Specialties & Facilities", definition: "Setor que avalia e trata doenças do aparelho digestivo." },
  { english: "Gynecology", spanish: "Ginecología", portuguese: "Ginecologia", category: "Specialties & Facilities", definition: "Especialidade médica dedicada à saúde do sistema reprodutor feminino." },
  { english: "Hematology", spanish: "Hematología", portuguese: "Hematologia", category: "Specialties & Facilities", definition: "Especialidade médica que estuda o sangue e trata doenças relacionadas a ele." },
  { english: "Hospice", spanish: "Centro de cuidados paliativos para pacientes al final de la vida", portuguese: "Unidade de cuidados paliativos para pacientes em fim de vida", category: "Specialties & Facilities", definition: "Serviço que oferece cuidados para aliviar sintomas e apoiar pessoas com doenças graves." },
  { english: "Imaging department", spanish: "Departamento de diagnóstico por imágenes", portuguese: "Departamento de diagnóstico por imagem", category: "Specialties & Facilities", definition: "Setor que realiza exames de imagem para auxiliar na avaliação da saúde." },
  { english: "Infectious Diseases", spanish: "Enfermedades infecciosas", portuguese: "Infectologia", category: "Specialties & Facilities", definition: "Especialidade que previne, diagnostica e trata doenças causadas por microrganismos." },
  { english: "Internal Medicine", spanish: "Medicina interna", portuguese: "Clínica médica", category: "Specialties & Facilities", definition: "Especialidade dedicada à prevenção, ao diagnóstico e ao tratamento de doenças em adultos." },
  { english: "Labor and Delivery Unit", spanish: "Unidad de trabajo de parto y parto", portuguese: "Unidade de trabalho de parto e parto", category: "Specialties & Facilities", definition: "Setor hospitalar destinado ao atendimento durante o trabalho de parto e o nascimento." },
  { english: "Maternal Fetal Medicine", spanish: "Medicina materno-fetal", portuguese: "Medicina materno-fetal", category: "Specialties & Facilities", definition: "Área que acompanha gestações de alto risco e condições que afetam o feto." },
  { english: "Maxillofacial", spanish: "Maxilofacial", portuguese: "Maxilofacial", category: "Specialties & Facilities", definition: "Termo relativo à face e aos maxilares, especialmente em contextos cirúrgicos." },
  { english: "Nephrology", spanish: "Nefrología", portuguese: "Nefrologia", category: "Specialties & Facilities", definition: "Especialidade que estuda e trata doenças dos rins." },
  { english: "Neurology", spanish: "Neurología", portuguese: "Neurologia", category: "Specialties & Facilities", definition: "Especialidade que diagnostica e trata doenças do sistema nervoso." },
  { english: "Neurosurgery", spanish: "Neurocirugía", portuguese: "Neurocirurgia", category: "Specialties & Facilities", definition: "Especialidade cirúrgica voltada a doenças do cérebro, da medula espinhal e dos nervos." },
  { english: "Nursing home", spanish: "Residencia de ancianos", portuguese: "Instituição de longa permanência para idosos", category: "Specialties & Facilities", definition: "Instituição que oferece moradia e cuidados a pessoas que necessitam de apoio continuado." },
  { english: "Nursery", spanish: "Sala de recién nacidos", portuguese: "Berçário", category: "Specialties & Facilities", definition: "Área hospitalar destinada aos cuidados de recém-nascidos." },
  { english: "OBGYN", spanish: "Obstetricia y ginecología", portuguese: "Obstetrícia e ginecologia", category: "Specialties & Facilities", definition: "Sigla inglesa para obstetrícia e ginecologia, especialidades relacionadas à saúde reprodutiva." },
  { english: "Obstetrics", spanish: "Obstetricia", portuguese: "Obstetrícia", category: "Specialties & Facilities", definition: "Especialidade que acompanha a gestação, o parto e o período após o nascimento." },
  { english: "Occupational Therapy", spanish: "Terapia ocupacional", portuguese: "Terapia ocupacional", category: "Specialties & Facilities", definition: "Área que promove autonomia em atividades cotidianas por meio de intervenções terapêuticas." },
  { english: "Oncology", spanish: "Oncología", portuguese: "Oncologia", category: "Specialties & Facilities", definition: "Especialidade dedicada à prevenção, ao diagnóstico e ao tratamento do câncer." },
  { english: "Operating Room", spanish: "Quirófano", portuguese: "Sala cirúrgica", category: "Specialties & Facilities", definition: "Ambiente hospitalar equipado para a realização de procedimentos cirúrgicos." },
  { english: "Ophthalmology", spanish: "Oftalmología", portuguese: "Oftalmologia", category: "Specialties & Facilities", definition: "Especialidade que cuida da saúde dos olhos e da visão." },
  { english: "Optics", spanish: "Óptica", portuguese: "Óptica", category: "Specialties & Facilities", definition: "Área relacionada à visão, às lentes e aos dispositivos ópticos." },
  { english: "Orthodontics", spanish: "Ortodoncia", portuguese: "Ortodontia", category: "Specialties & Facilities", definition: "Área da odontologia que corrige o posicionamento dos dentes e dos maxilares." },
  { english: "Orthopedics", spanish: "Ortopedia", portuguese: "Ortopedia", category: "Specialties & Facilities", definition: "Especialidade que trata doenças e lesões dos ossos, das articulações e dos músculos." },
  { english: "Pain Management Clinic", spanish: "Clínica de manejo del dolor", portuguese: "Clínica de tratamento da dor", category: "Specialties & Facilities", definition: "Serviço especializado na avaliação e no cuidado de pessoas com dor." },
  { english: "Palliative Medicine", spanish: "Medicina paliativa", portuguese: "Medicina paliativa", category: "Specialties & Facilities", definition: "Área que busca aliviar sintomas e melhorar a qualidade de vida diante de doenças graves." },
  { english: "Pathology", spanish: "Patología", portuguese: "Patologia", category: "Specialties & Facilities", definition: "Área que estuda doenças e alterações em tecidos, células e órgãos." },
  { english: "Pediatrics", spanish: "Pediatría", portuguese: "Pediatria", category: "Specialties & Facilities", definition: "Especialidade dedicada à saúde de crianças e adolescentes." },
  { english: "Physical Therapy", spanish: "Fisioterapia", portuguese: "Fisioterapia", category: "Specialties & Facilities", definition: "Área que avalia e trata alterações do movimento e da função física." },
  { english: "Physiotherapy", spanish: "Fisioterapia", portuguese: "Fisioterapia", category: "Specialties & Facilities", definition: "Área que utiliza recursos terapêuticos para promover movimento e função física." },
  { english: "Plastic Surgery", spanish: "Cirugía plástica", portuguese: "Cirurgia plástica", category: "Specialties & Facilities", definition: "Especialidade cirúrgica que repara, reconstrói ou modifica estruturas do corpo." },
  { english: "Podiatry", spanish: "Podología", portuguese: "Podologia", category: "Specialties & Facilities", definition: "Área dedicada à avaliação e aos cuidados dos pés." },
  { english: "Psychiatry", spanish: "Psiquiatría", portuguese: "Psiquiatria", category: "Specialties & Facilities", definition: "Especialidade médica que diagnostica e trata transtornos mentais." },
  { english: "Psychology", spanish: "Psicología", portuguese: "Psicologia", category: "Specialties & Facilities", definition: "Área que estuda o comportamento e os processos mentais." },
  { english: "Radiology", spanish: "Radiología", portuguese: "Radiologia", category: "Specialties & Facilities", definition: "Especialidade que utiliza exames de imagem para auxiliar na avaliação de doenças." },
  { english: "Recovery Room", spanish: "Sala de recuperación", portuguese: "Sala de recuperação", category: "Specialties & Facilities", definition: "Local onde o paciente é monitorado enquanto se recupera da anestesia ou de um procedimento." },
  { english: "Rehab Center", spanish: "Centro de rehabilitación", portuguese: "Centro de reabilitação", category: "Specialties & Facilities", definition: "Estabelecimento que oferece serviços para recuperar ou melhorar funções físicas, cognitivas ou emocionais." },
  { english: "Rheumatology", spanish: "Reumatología", portuguese: "Reumatologia", category: "Specialties & Facilities", definition: "Especialidade médica que trata doenças das articulações, músculos, ossos e tecidos conjuntivos." },
  { english: "Speech Therapy", spanish: "Terapia del habla", portuguese: "Fonoaudiologia", category: "Specialties & Facilities", definition: "Área que avalia e trata dificuldades de comunicação, voz, fala e deglutição." },
  { english: "Sports Medicine", spanish: "Medicina deportiva", portuguese: "Medicina do esporte", category: "Specialties & Facilities", definition: "Área médica dedicada à prevenção e ao cuidado de lesões e condições relacionadas à prática esportiva." },
  { english: "Thoracic Surgery", spanish: "Cirugía torácica", portuguese: "Cirurgia torácica", category: "Specialties & Facilities", definition: "Especialidade cirúrgica que trata doenças e lesões dos órgãos e estruturas do tórax." },
  { english: "Urgent Care Unit", spanish: "Unidad de atención urgente", portuguese: "Unidade de atendimento de urgência", category: "Specialties & Facilities", definition: "Serviço de saúde que atende problemas que precisam de avaliação rápida, mas nem sempre exigem emergência hospitalar." },
  { english: "Urology", spanish: "Urología", portuguese: "Urologia", category: "Specialties & Facilities", definition: "Especialidade que cuida do sistema urinário e do sistema reprodutor masculino." },
  { english: "Vascular Surgery", spanish: "Cirugía vascular", portuguese: "Cirurgia vascular", category: "Specialties & Facilities", definition: "Especialidade cirúrgica que trata doenças dos vasos sanguíneos e linfáticos." },
  { english: "Waiting Room", spanish: "Sala de espera", portuguese: "Sala de espera", category: "Specialties & Facilities", definition: "Espaço onde pacientes aguardam atendimento em um serviço de saúde." },
  { english: "Walk-in clinic", spanish: "Clínica sin cita previa", portuguese: "Clínica sem necessidade de agendamento", category: "Specialties & Facilities", definition: "Clínica que atende pacientes sem necessidade de marcar horário com antecedência." },
  { english: "Women's health", spanish: "Salud de la mujer", portuguese: "Saúde da mulher", category: "Specialties & Facilities", definition: "Área de cuidados de saúde voltada às necessidades e condições que afetam as mulheres." },
  { english: "Prenatal Care", spanish: "Atención prenatal", portuguese: "Assistência pré-natal", category: "Specialties & Facilities", definition: "Cuidados de saúde oferecidos durante a gravidez para acompanhar a saúde da gestante e do bebê." },
  { english: "Postpartum Care", spanish: "Atención posparto", portuguese: "Assistência pós-parto", category: "Specialties & Facilities", definition: "Cuidados de saúde oferecidos à mulher após o parto, durante o período de recuperação." },
  // Medical Professions — termos adicionados do MedicalGlossary.pdf
  { english: "Anesthesiologist", spanish: "Anestesiólogo", portuguese: "Anestesiologista", category: "Medical Professions", definition: "Médico especializado em anestesia, controle da dor e acompanhamento das funções vitais durante procedimentos." },
  { english: "Audiologist", spanish: "Audiólogo", portuguese: "Fonoaudiólogo especializado em audiologia", category: "Medical Professions", definition: "Profissional que avalia a audição e auxilia no diagnóstico e na reabilitação de alterações auditivas." },
  { english: "Bereavement Counselor", spanish: "Consejero de duelo", portuguese: "Aconselhador em luto", category: "Medical Professions", definition: "Profissional que oferece apoio emocional a pessoas que enfrentam a perda de alguém." },
  { english: "Cardiologist", spanish: "Cardiólogo", portuguese: "Cardiologista", category: "Medical Professions", definition: "Médico especializado na prevenção, avaliação e tratamento de doenças do coração e da circulação." },
  { english: "Case Manager", spanish: "Gestor de casos", portuguese: "Gestor de casos", category: "Medical Professions", definition: "Profissional que coordena serviços e recursos para apoiar as necessidades de saúde de uma pessoa." },
  { english: "Chiropractor", spanish: "Quiropráctico", portuguese: "Quiropraxista", category: "Medical Professions", definition: "Profissional que utiliza técnicas manuais para avaliar e tratar problemas musculoesqueléticos." },
  { english: "Geneticist", spanish: "Genetista", portuguese: "Geneticista", category: "Medical Professions", definition: "Profissional que estuda genes, hereditariedade e condições relacionadas a alterações genéticas." },
  { english: "Clinician", spanish: "Profesional clínico", portuguese: "Profissional de saúde que presta atendimento clínico", category: "Medical Professions", definition: "Profissional que presta atendimento ou participa da avaliação e do cuidado de pacientes." },
  { english: "Dental Hygienist", spanish: "Higienista dental", portuguese: "Higienista dental", category: "Medical Professions", definition: "Profissional que realiza cuidados preventivos de saúde bucal e orienta sobre higiene dos dentes." },
  { english: "Dentist", spanish: "Dentista", portuguese: "Dentista", category: "Medical Professions", definition: "Profissional que avalia, previne e trata problemas dos dentes, da boca e dos tecidos relacionados." },
  { english: "Dermatologist", spanish: "Dermatólogo", portuguese: "Dermatologista", category: "Medical Professions", definition: "Médico especializado em doenças da pele, dos cabelos e das unhas." },
  { english: "ENT Doctor", spanish: "Otorrinolaringólogo", portuguese: "Otorrinolaringologista", category: "Medical Professions", definition: "Médico especializado em doenças do ouvido, nariz e garganta." },
  { english: "Family Doctor", spanish: "Médico de familia", portuguese: "Médico de família", category: "Medical Professions", definition: "Médico que oferece cuidados abrangentes e contínuos a pessoas de diferentes idades." },
  { english: "Genetic Counselor", spanish: "Asesor genético", portuguese: "Aconselhador genético", category: "Medical Professions", definition: "Profissional que explica informações genéticas e apoia decisões relacionadas a riscos hereditários." },
  { english: "GI Doctor", spanish: "Gastroenterólogo", portuguese: "Gastroenterologista", category: "Medical Professions", definition: "Médico especializado em doenças do sistema digestório." },
  { english: "Gynecologist", spanish: "Ginecólogo", portuguese: "Ginecologista", category: "Medical Professions", definition: "Médico especializado na saúde do sistema reprodutor feminino." },
  { english: "Home attendant", spanish: "Asistente de atención domiciliaria", portuguese: "Cuidador domiciliar", category: "Medical Professions", definition: "Profissional que presta assistência cotidiana e apoio a pessoas em suas casas." },
  { english: "Home health aide", spanish: "Auxiliar de salud domiciliaria", portuguese: "Auxiliar de saúde domiciliar", category: "Medical Professions", definition: "Profissional que auxilia nos cuidados de saúde e nas atividades diárias no domicílio." },
  { english: "Microbiologist", spanish: "Microbiólogo", portuguese: "Microbiologista", category: "Medical Professions", definition: "Especialista que estuda microrganismos, como bactérias, vírus e fungos." },
  { english: "Nephrologist", spanish: "Nefrólogo", portuguese: "Nefrologista", category: "Medical Professions", definition: "Médico especialista em rins e doenças renais." },
  { english: "Neurologist", spanish: "Neurólogo", portuguese: "Neurologista", category: "Medical Professions", definition: "Médico especialista no sistema nervoso e em suas doenças." },
  { english: "Neurosurgeon", spanish: "Neurocirujano", portuguese: "Neurocirurgião", category: "Medical Professions", definition: "Médico que realiza cirurgias no cérebro, na medula espinhal e nos nervos." },
  { english: "Nurse Practitioner", spanish: "Enfermero de práctica avanzada", portuguese: "Enfermeiro de prática avançada", category: "Medical Professions", definition: "Enfermeiro com formação avançada e atribuições clínicas ampliadas, conforme as normas locais." },
  { english: "Nutritionist/ Dietician", spanish: "Nutricionista / dietista", portuguese: "Nutricionista / dietista", category: "Medical Professions", definition: "Profissional que orienta sobre alimentação e nutrição." },
  { english: "Ob-Gyn Doctor", spanish: "Ginecoobstetra", portuguese: "Ginecologista e obstetra", category: "Medical Professions", definition: "Médico especialista em saúde reprodutiva, gestação e parto." },
  { english: "Obstetrician", spanish: "Obstetra", portuguese: "Obstetra", category: "Medical Professions", definition: "Médico especialista no acompanhamento da gestação, do parto e do pós-parto." },
  { english: "Occupational Therapist", spanish: "Terapeuta ocupacional", portuguese: "Terapeuta ocupacional", category: "Medical Professions", definition: "Profissional que promove autonomia em atividades cotidianas por meio de intervenções terapêuticas." },
  { english: "Optometrist / Optician", spanish: "Optometrista / óptico", portuguese: "Optometrista / óptico", category: "Medical Professions", definition: "O optometrista avalia a visão; o óptico adapta e fornece lentes corretivas." },
  { english: "Orthopedist", spanish: "Ortopedista", portuguese: "Ortopedista", category: "Medical Professions", definition: "Médico especialista em ossos, articulações, músculos e lesões do sistema musculoesquelético." },
  { english: "Orthotics and Prosthetics", spanish: "Ortesis y prótesis", portuguese: "Órteses e próteses", category: "Medical Professions", definition: "Área que trata da confecção e adaptação de dispositivos para apoiar ou substituir partes do corpo." },
  { english: "Paramedic", spanish: "Paramédico", portuguese: "Paramédico", category: "Medical Professions", definition: "Profissional treinado para prestar atendimento de emergência, especialmente antes da chegada ao hospital." },
  { english: "Patient Navigator", spanish: "Navegador de pacientes", portuguese: "Navegador de pacientes", category: "Medical Professions", definition: "Profissional que ajuda pacientes a compreender e acessar serviços e etapas do cuidado em saúde." },
  { english: "Pediatric Nurse", spanish: "Enfermero pediátrico", portuguese: "Enfermeiro pediátrico", category: "Medical Professions", definition: "Enfermeiro especializado no cuidado de bebês, crianças e adolescentes." },
  { english: "Pediatrician", spanish: "Pediatra", portuguese: "Pediatra", category: "Medical Professions", definition: "Médico especialista na saúde de bebês, crianças e adolescentes." },
  { english: "Pharmacist", spanish: "Farmacéutico", portuguese: "Farmacêutico", category: "Medical Professions", definition: "Profissional especializado em medicamentos e em seu uso seguro." },
  { english: "Physician Assistant- PA", spanish: "Asistente médico (PA)", portuguese: "Assistente médico (PA)", category: "Medical Professions", definition: "Profissional clínico que presta cuidados de saúde sob supervisão médica, conforme as normas locais." },
  { english: "Podiatrist", spanish: "Podólogo", portuguese: "Podólogo", category: "Medical Professions", definition: "Profissional especializado na avaliação e nos cuidados dos pés." },
  { english: "Primary Care Physician- PCP", spanish: "Médico de atención primaria (PCP)", portuguese: "Médico de atenção primária (PCP)", category: "Medical Professions", definition: "Médico que oferece cuidados gerais e coordena o acompanhamento de saúde." },
  { english: "Psychiatrist", spanish: "Psiquiatra", portuguese: "Psiquiatra", category: "Medical Professions", definition: "Médico especialista em saúde mental e transtornos mentais." },
  { english: "Psychologist", spanish: "Psicólogo", portuguese: "Psicólogo", category: "Medical Professions", definition: "Profissional que avalia e promove a saúde mental e o bem-estar psicológico." },
  { english: "Pulmonologist", spanish: "Neumólogo", portuguese: "Pneumologista", category: "Medical Professions", definition: "Médico especialista nos pulmões e nas doenças respiratórias." },
  { english: "Registered nurse", spanish: "Enfermero titulado", portuguese: "Enfermeiro registrado", category: "Medical Professions", definition: "Profissional de enfermagem com registro e habilitação para exercer a profissão." },
  { english: "Resident Doctor", spanish: "Médico residente", portuguese: "Médico residente", category: "Medical Professions", definition: "Médico que realiza formação especializada em serviço após a graduação." },
  { english: "Social Worker", spanish: "Trabajador social", portuguese: "Assistente social", category: "Medical Professions", definition: "Profissional que promove direitos e acesso a recursos e serviços sociais." },
  { english: "Surgeon", spanish: "Cirujano", portuguese: "Cirurgião", category: "Medical Professions", definition: "Médico especializado na realização de procedimentos cirúrgicos." },
  { english: "Therapist", spanish: "Terapeuta", portuguese: "Terapeuta", category: "Medical Professions", definition: "Profissional que realiza intervenções para apoiar a saúde ou o bem-estar." },
  { english: "Triage Nurse", spanish: "Enfermero de triaje", portuguese: "Enfermeiro de triagem", category: "Medical Professions", definition: "Profissional de enfermagem que avalia e prioriza pacientes conforme a gravidade de suas condições." },
  { english: "Vascular Surgeon", spanish: "Cirujano vascular", portuguese: "Cirurgião vascular", category: "Medical Professions", definition: "Médico especializado no tratamento cirúrgico de doenças dos vasos sanguíneos." },
  { english: "Veterinarian (vet)", spanish: "Veterinario (vet)", portuguese: "Veterinário (vet)", category: "Medical Professions", definition: "Profissional que cuida da saúde e trata doenças de animais." },
  // Ophthalmology — termos adicionados do MedicalGlossary.pdf
  { english: "Aqueous humor", spanish: "Humor acuoso", portuguese: "Humor aquoso", category: "Ophthalmology", definition: "Líquido transparente que preenche a parte anterior do olho e ajuda a manter sua pressão." },
  { english: "Astigmatism", spanish: "Astigmatismo", portuguese: "Astigmatismo", category: "Ophthalmology", definition: "Erro de refração causado por curvatura irregular da córnea ou do cristalino." },
  { english: "Blind spot", spanish: "Punto ciego", portuguese: "Ponto cego", category: "Ophthalmology", definition: "Pequena área do campo visual sem percepção, correspondente à saída do nervo óptico." },
  { english: "Cataracts", spanish: "Cataratas", portuguese: "Cataratas", category: "Ophthalmology", definition: "Opacificação do cristalino que pode reduzir a nitidez da visão." },
  { english: "Cloudy vision", spanish: "Visión borrosa", portuguese: "Visão turva", category: "Ophthalmology", definition: "Alteração visual em que os objetos parecem pouco nítidos ou enevoados." },
  { english: "Cones and rods", spanish: "Conos y bastones", portuguese: "Cones e bastonetes", category: "Ophthalmology", definition: "Células da retina responsáveis pela visão das cores, dos detalhes e em baixa luminosidade." },
  { english: "Contact lenses", spanish: "Lentes de contacto", portuguese: "Lentes de contato", category: "Ophthalmology", definition: "Lentes colocadas sobre os olhos para corrigir a visão." },
  { english: "Glaucoma", spanish: "Glaucoma", portuguese: "Glaucoma", category: "Ophthalmology", definition: "Grupo de doenças que pode danificar o nervo óptico e comprometer a visão." },
  { english: "Hypermetropia/ Farsightedness", spanish: "Hipermetropía", portuguese: "Hipermetropia", category: "Ophthalmology", definition: "Erro de refração que costuma dificultar a visão de objetos próximos." },
  { english: "Iris", spanish: "Iris", portuguese: "Íris", category: "Ophthalmology", definition: "Parte colorida do olho que controla a quantidade de luz que entra pela pupila." },
  { english: "Myopia / Nearsightedness", spanish: "Miopía", portuguese: "Miopia", category: "Ophthalmology", definition: "Erro de refração que costuma dificultar a visão de objetos distantes." },
  { english: "Optic Nerve", spanish: "Nervio óptico", portuguese: "Nervo óptico", category: "Ophthalmology", definition: "Nervo que transmite informações visuais da retina ao cérebro." },
  { english: "Pink eye/ Conjunctivitis", spanish: "Ojo rosado / conjuntivitis", portuguese: "Conjuntivite", category: "Ophthalmology", definition: "Inflamação da conjuntiva, membrana que reveste a parte branca do olho e as pálpebras." },
  { english: "Pupil", spanish: "Pupila", portuguese: "Pupila", category: "Ophthalmology", definition: "Abertura no centro da íris que regula a entrada de luz no olho." },
  { english: "Redness", spanish: "Enrojecimiento", portuguese: "Vermelhidão", category: "Ophthalmology", definition: "Coloração avermelhada da pele ou dos olhos, geralmente relacionada à dilatação de vasos sanguíneos." },
  { english: "Retina", spanish: "Retina", portuguese: "Retina", category: "Ophthalmology", definition: "Camada interna do olho que capta a luz e inicia a formação das imagens." },
  { english: "Retinal detachment", spanish: "Desprendimiento de retina", portuguese: "Descolamento de retina", category: "Ophthalmology", definition: "Separação da retina das camadas subjacentes na parte posterior do olho." },
  { english: "Sclera", spanish: "Esclerótica", portuguese: "Esclera", category: "Ophthalmology", definition: "Camada externa branca e resistente que protege o olho." },
  { english: "Shard", spanish: "Fragmento", portuguese: "Fragmento", category: "Ophthalmology", definition: "Pequeno pedaço de material, como um caco que pode atingir o olho." },
  { english: "Strabismus", spanish: "Estrabismo", portuguese: "Estrabismo", category: "Ophthalmology", definition: "Condição em que os olhos não se alinham corretamente na mesma direção." },
  { english: "Sty", spanish: "Orzuelo", portuguese: "Terçol", category: "Ophthalmology", definition: "Nódulo doloroso na pálpebra, geralmente causado por inflamação de uma glândula." },
  { english: "Tear ducts", spanish: "Conductos lagrimales", portuguese: "Ductos lacrimais", category: "Ophthalmology", definition: "Pequenos canais que drenam as lágrimas dos olhos para o nariz." },
  { english: "Watery eyes", spanish: "Ojos llorosos", portuguese: "Olhos lacrimejantes", category: "Ophthalmology", definition: "Produção excessiva ou acúmulo de lágrimas nos olhos." },
  // Dermatology — termos adicionados do MedicalGlossary.pdf
  { english: "Blister", spanish: "Ampolla", portuguese: "Bolha", category: "Dermatology", definition: "Elevação da pele preenchida por líquido, geralmente causada por atrito ou queimadura." },
  { english: "Blotch/ Spot", spanish: "Mancha", portuguese: "Mancha", category: "Dermatology", definition: "Área localizada da pele com cor ou aparência diferente das regiões ao redor." },
  { english: "Canker sore", spanish: "Afta", portuguese: "Afta", category: "Dermatology", definition: "Pequena úlcera dolorosa que aparece na mucosa da boca." },
  { english: "Cauterize", spanish: "Cauterizar", portuguese: "Cauterizar", category: "Dermatology", definition: "Aplicar calor ou substância química para destruir tecido ou controlar sangramento." },
  { english: "Cold sore", spanish: "Herpes labial", portuguese: "Herpes labial", category: "Dermatology", definition: "Lesão nos lábios geralmente causada pelo vírus herpes simples." },
  { english: "Eczema", spanish: "Eccema", portuguese: "Eczema", category: "Dermatology", definition: "Inflamação da pele que pode causar coceira, vermelhidão e descamação." },
  { english: "Epidermis", spanish: "Epidermis", portuguese: "Epiderme", category: "Dermatology", definition: "Camada mais externa da pele, que atua como barreira protetora." },
  { english: "Eruption", spanish: "Erupción cutánea", portuguese: "Erupção cutânea", category: "Dermatology", definition: "Alteração visível na pele, como manchas, bolhas ou vermelhidão." },
  { english: "Freckles", spanish: "Pecas", portuguese: "Sardas", category: "Dermatology", definition: "Pequenas manchas pigmentadas na pele, geralmente mais visíveis após exposição solar." },
  { english: "Gangrene", spanish: "Gangrena", portuguese: "Gangrena", category: "Dermatology", definition: "Morte de tecido corporal, geralmente associada à falta de irrigação sanguínea ou infecção." },
  { english: "Hair follicle", spanish: "Folículo piloso", portuguese: "Folículo piloso", category: "Dermatology", definition: "Pequena estrutura da pele da qual cresce um pelo." },
  { english: "Hangnail", spanish: "Padrastro", portuguese: "Pelinha solta junto à unha", category: "Dermatology", definition: "Pequena tira de pele rasgada ao lado da unha." },
  { english: "Ingrown toenail", spanish: "Uña encarnada del pie", portuguese: "Unha encravada do pé", category: "Dermatology", definition: "Condição em que a borda da unha do pé cresce para dentro da pele." },
  { english: "Moisturizing cream", spanish: "Crema hidratante", portuguese: "Creme hidratante", category: "Dermatology", definition: "Produto aplicado à pele para ajudar a manter sua hidratação." },
  { english: "Phototherapy", spanish: "Fototerapia", portuguese: "Fototerapia", category: "Dermatology", definition: "Uso terapêutico de luz para tratar determinadas condições de saúde." },
  { english: "Psoriasis", spanish: "Psoriasis", portuguese: "Psoríase", category: "Dermatology", definition: "Doença inflamatória crônica que pode causar placas avermelhadas e descamativas na pele." },
  { english: "Pores", spanish: "Poros", portuguese: "Poros", category: "Dermatology", definition: "Pequenas aberturas na pele associadas às glândulas sudoríparas e aos folículos pilosos." },
  { english: "Ringworm", spanish: "Tiña", portuguese: "Tinha", category: "Dermatology", definition: "Infecção fúngica da pele que pode formar manchas arredondadas e causar coceira." },
  { english: "Scabies", spanish: "Sarna", portuguese: "Escabiose", category: "Dermatology", definition: "Infestação da pele por ácaros que costuma causar coceira intensa." },
  { english: "Scalp", spanish: "Cuero cabelludo", portuguese: "Couro cabeludo", category: "Dermatology", definition: "Pele que recobre a parte superior da cabeça e onde crescem os cabelos." },
  { english: "Skin Culture", spanish: "Cultivo de piel", portuguese: "Cultura de pele", category: "Dermatology", definition: "Exame laboratorial que analisa uma amostra da pele para identificar microrganismos." },
  { english: "Skin Layers", spanish: "Capas de la piel", portuguese: "Camadas da pele", category: "Dermatology", definition: "Estratos que compõem a pele, incluindo epiderme, derme e tecido subcutâneo." },
  { english: "Skin tags", spanish: "Acrocordones", portuguese: "Acrocórdons", category: "Dermatology", definition: "Pequenas projeções benignas de pele, geralmente presas por uma base estreita." },
  { english: "Stretch marks", spanish: "Estrías", portuguese: "Estrias", category: "Dermatology", definition: "Marcas lineares na pele decorrentes do estiramento e de alterações nas fibras cutâneas." },
  { english: "Sunscreen", spanish: "Protector solar", portuguese: "Protetor solar", category: "Dermatology", definition: "Produto que ajuda a proteger a pele dos efeitos da radiação ultravioleta." },
  { english: "Sunburn", spanish: "Quemadura solar", portuguese: "Queimadura solar", category: "Dermatology", definition: "Inflamação da pele causada pela exposição excessiva à radiação ultravioleta." },
  { english: "Vesicle", spanish: "Vesícula", portuguese: "Vesícula", category: "Dermatology", definition: "Pequena elevação da pele preenchida por líquido." },
  { english: "Warts", spanish: "Verrugas", portuguese: "Verrugas", category: "Dermatology", definition: "Lesões cutâneas geralmente causadas por tipos do papilomavírus humano." },
  { english: "Wrinkles", spanish: "Arrugas", portuguese: "Rugas", category: "Dermatology", definition: "Dobras ou linhas na pele que podem surgir com o envelhecimento e outros fatores." },
  // Dental — termos adicionados do MedicalGlossary.pdf
  { english: "Cleaning", spanish: "Limpieza dental", portuguese: "Limpeza dentária", category: "Dental", definition: "Procedimento para remover placa bacteriana e tártaro dos dentes." },
  { english: "Crown", spanish: "Corona dental", portuguese: "Coroa dentária", category: "Dental", definition: "Prótese que recobre um dente para restaurar sua forma, tamanho ou resistência." },
  { english: "Decay / Cavity", spanish: "Caries / cavidad cariosa", portuguese: "Cárie / cavidade cariosa", category: "Dental", definition: "Deterioração do dente que pode formar uma cavidade." },
  { english: "Dental braces", spanish: "Aparatos de ortodoncia", portuguese: "Aparelho ortodôntico", category: "Dental", definition: "Dispositivo usado para corrigir o alinhamento dos dentes e da mordida." },
  { english: "Dental bridge", spanish: "Puente dental", portuguese: "Ponte dentária", category: "Dental", definition: "Prótese fixa que substitui um ou mais dentes ausentes, apoiando-se nos dentes vizinhos." },
  { english: "Dental Floss", spanish: "Hilo dental", portuguese: "Fio dental", category: "Dental", definition: "Fio usado para remover resíduos e placa bacteriana entre os dentes." },
  { english: "Dentures", spanish: "Prótesis dentales", portuguese: "Próteses dentárias", category: "Dental", definition: "Dispositivos removíveis que substituem alguns ou todos os dentes ausentes." },
  { english: "Enamel", spanish: "Esmalte dental", portuguese: "Esmalte dentário", category: "Dental", definition: "Camada externa dura que protege a coroa do dente." },
  { english: "Endodontics", spanish: "Endodoncia", portuguese: "Endodontia", category: "Dental", definition: "Área da odontologia que trata a polpa dentária e os canais radiculares." },
  { english: "Filling", spanish: "Empaste dental", portuguese: "Obturação dentária", category: "Dental", definition: "Material colocado no dente para restaurar áreas danificadas por cárie ou trauma." },
  { english: "Fluoride", spanish: "Fluoruro", portuguese: "Flúor", category: "Dental", definition: "Mineral que fortalece o esmalte dentário e ajuda a prevenir cáries." },
  { english: "Gargle", spanish: "Hacer gárgaras", portuguese: "Gargarejar", category: "Dental", definition: "Agitar líquido na garganta e na boca sem engolir." },
  { english: "Mouthguard", spanish: "Protector bucal", portuguese: "Protetor bucal", category: "Dental", definition: "Dispositivo que protege os dentes e os tecidos da boca contra impactos." },
  { english: "Mouthwash", spanish: "Enjuague bucal", portuguese: "Enxaguante bucal", category: "Dental", definition: "Líquido usado para enxaguar a boca, podendo conter agentes antissépticos ou flúor." },
  { english: "Periodontal Disease", spanish: "Enfermedad periodontal", portuguese: "Doença periodontal", category: "Dental", definition: "Condição que afeta os tecidos de suporte dos dentes, como gengiva e osso." },
  { english: "Plaque", spanish: "Placa bacteriana", portuguese: "Placa bacteriana", category: "Dental", definition: "Película de bactérias que se forma continuamente sobre os dentes." },
  { english: "Porcelain", spanish: "Porcelana", portuguese: "Porcelana", category: "Dental", definition: "Material cerâmico usado em restaurações e próteses dentárias." },
  { english: "Root Canal", spanish: "Conducto radicular", portuguese: "Canal radicular", category: "Dental", definition: "Canal interno da raiz dentária que contém a polpa e seus nervos e vasos." },
  { english: "Temporomandibular disorder (TMD)", spanish: "Trastorno temporomandibular (TTM)", portuguese: "Disfunção temporomandibular (DTM)", category: "Dental", definition: "Alteração que afeta a articulação entre a mandíbula e o crânio." },
  { english: "Toothpaste", spanish: "Pasta dental", portuguese: "Creme dental", category: "Dental", definition: "Produto usado na escovação para limpar os dentes." },
  { english: "Wisdom tooth", spanish: "Muela del juicio", portuguese: "Dente do siso", category: "Dental", definition: "Último molar a nascer, geralmente no fim da adolescência ou no início da vida adulta." },
  { english: "Baby Teeth", spanish: "Dientes de leche", portuguese: "Dentes de leite", category: "Dental", definition: "Primeiros dentes, que costumam ser substituídos pelos dentes permanentes durante a infância." },
  { english: "Canine", spanish: "Canino", portuguese: "Canino", category: "Dental", definition: "Dente pontiagudo situado entre os incisivos e os pré-molares." },
  { english: "Chipped Tooth", spanish: "Diente astillado", portuguese: "Dente lascado", category: "Dental", definition: "Dente com uma parte quebrada ou lascada." },
  // Genetics — termos adicionados do MedicalGlossary.pdf
  { english: "Albinism", spanish: "Albinismo", portuguese: "Albinismo", category: "Genetics", definition: "Condição genética que reduz ou impede a produção de melanina." },
  { english: "Amino acids", spanish: "Aminoácidos", portuguese: "Aminoácidos", category: "Genetics", definition: "Moléculas que formam proteínas e participam de diversas funções celulares." },
  { english: "Amniocentesis", spanish: "Amniocentesis", portuguese: "Amniocentese", category: "Genetics", definition: "Procedimento que coleta líquido amniótico para análise durante a gestação." },
  { english: "Carrier", spanish: "Portador", portuguese: "Portador", category: "Genetics", definition: "Pessoa que possui uma variante genética e pode transmiti-la, mesmo sem apresentar a condição." },
  { english: "Chromosomes", spanish: "Cromosomas", portuguese: "Cromossomos", category: "Genetics", definition: "Estruturas celulares que contêm DNA e genes." },
  { english: "Color blindness", spanish: "Daltonismo", portuguese: "Daltonismo", category: "Genetics", definition: "Alteração da visão que dificulta distinguir certas cores." },
  { english: "Congenital disease", spanish: "Enfermedad congénita", portuguese: "Doença congênita", category: "Genetics", definition: "Condição presente desde o nascimento, que pode ter causas genéticas ou ambientais." },
  { english: "DNA", spanish: "ADN", portuguese: "DNA", category: "Genetics", definition: "Molécula que armazena as informações genéticas das células." },
  { english: "Down Syndrome", spanish: "Síndrome de Down", portuguese: "Síndrome de Down", category: "Genetics", definition: "Condição genética causada pela presença de uma cópia extra do cromossomo 21." },
  { english: "Gene", spanish: "Gen", portuguese: "Gene", category: "Genetics", definition: "Segmento de DNA que contém informações para características ou funções do organismo." },
  { english: "Genetic Defects", spanish: "Defectos genéticos", portuguese: "Defeitos genéticos", category: "Genetics", definition: "Alterações no material genético que podem afetar características ou funções do organismo." },
  { english: "Genome", spanish: "Genoma", portuguese: "Genoma", category: "Genetics", definition: "Conjunto completo do material genético de um organismo." },
  { english: "Genotype", spanish: "Genotipo", portuguese: "Genótipo", category: "Genetics", definition: "Conjunto de variantes genéticas de um indivíduo." },
  { english: "Inherit", spanish: "Heredar", portuguese: "Herdar", category: "Genetics", definition: "Receber material genético de um ou ambos os progenitores." },
  { english: "Molecules", spanish: "Moléculas", portuguese: "Moléculas", category: "Genetics", definition: "Grupos de átomos unidos que formam uma substância." },
  { english: "Mutation", spanish: "Mutación", portuguese: "Mutação", category: "Genetics", definition: "Alteração na sequência do material genético." },
  { english: "Phenotype", spanish: "Fenotipo", portuguese: "Fenótipo", category: "Genetics", definition: "Características observáveis resultantes da interação entre genes e ambiente." },
  { english: "Recessive gene", spanish: "Gen recesivo", portuguese: "Gene recessivo", category: "Genetics", definition: "Gene cuja característica geralmente se manifesta quando há duas cópias da variante." },
  { english: "Sickle cell anemia", spanish: "Anemia de células falciformes", portuguese: "Anemia falciforme", category: "Genetics", definition: "Doença hereditária que altera a forma das hemácias e pode dificultar a circulação sanguínea." },
  // OBGYN — termos adicionados do MedicalGlossary.pdf
  { english: "Amenorrhea", spanish: "Amenorrea", portuguese: "Amenorreia", category: "OBGYN", definition: "Ausência de menstruação." },
  { english: "Amniotic Fluid", spanish: "Líquido amniótico", portuguese: "Líquido amniótico", category: "OBGYN", definition: "Líquido que envolve e protege o feto durante a gestação." },
  { english: "Amniotic sac", spanish: "Saco amniótico", portuguese: "Saco amniótico", category: "OBGYN", definition: "Membrana que envolve o feto e contém o líquido amniótico." },
  { english: "Benign tumor", spanish: "Tumor benigno", portuguese: "Tumor benigno", category: "OBGYN", definition: "Crescimento de células que não invade tecidos próximos nem se espalha para outras partes do corpo." },
  { english: "Breast Engorgement", spanish: "Congestión mamaria", portuguese: "Ingurgitamento mamário", category: "OBGYN", definition: "Inchaço e endurecimento das mamas, frequentemente relacionados ao acúmulo de leite." },
  { english: "Breast Tenderness", spanish: "Sensibilidad mamaria", portuguese: "Sensibilidade mamária", category: "OBGYN", definition: "Sensação de dor ou desconforto nas mamas." },
  { english: "C-Section", spanish: "Cesárea", portuguese: "Cesárea", category: "OBGYN", definition: "Parto realizado por meio de uma cirurgia que retira o bebê pelo abdome e pelo útero." },
  { english: "Colposcopy", spanish: "Colposcopia", portuguese: "Colposcopia", category: "OBGYN", definition: "Exame que permite observar o colo do útero, a vagina e a vulva com aumento." },
  { english: "Contraceptives", spanish: "Anticonceptivos", portuguese: "Anticoncepcionais", category: "OBGYN", definition: "Métodos ou substâncias usados para prevenir a gravidez." },
  { english: "Contractions", spanish: "Contracciones", portuguese: "Contrações", category: "OBGYN", definition: "Enrijecimentos rítmicos do útero que podem ocorrer durante o trabalho de parto." },
  { english: "Dilation", spanish: "Dilatación", portuguese: "Dilatação", category: "OBGYN", definition: "Aumento da abertura do colo do útero durante o trabalho de parto." },
  { english: "Discharge/ Drainage", spanish: "Secreción / drenaje", portuguese: "Secreção / drenagem", category: "OBGYN", definition: "Saída de líquido ou material de uma região do corpo." },
  { english: "Due date", spanish: "Fecha probable de parto", portuguese: "Data provável do parto", category: "OBGYN", definition: "Estimativa da data em que o bebê deve nascer." },
  { english: "Ectopic Pregnancy", spanish: "Embarazo ectópico", portuguese: "Gravidez ectópica", category: "OBGYN", definition: "Gravidez em que o embrião se implanta fora do útero." },
  { english: "Fetus", spanish: "Feto", portuguese: "Feto", category: "OBGYN", definition: "Ser em desenvolvimento no útero após o período embrionário." },
  { english: "Full term", spanish: "A término", portuguese: "A termo", category: "OBGYN", definition: "Diz-se da gestação que alcançou o período considerado adequado para o nascimento." },
  { english: "Gestational Diabetes", spanish: "Diabetes gestacional", portuguese: "Diabetes gestacional", category: "OBGYN", definition: "Alteração da glicose no sangue que se desenvolve durante a gestação." },
  { english: "Heavy Bleeding", spanish: "Sangrado abundante", portuguese: "Sangramento intenso", category: "OBGYN", definition: "Perda de sangue em quantidade elevada." },
  { english: "Infertility", spanish: "Infertilidad", portuguese: "Infertilidade", category: "OBGYN", definition: "Dificuldade de conseguir uma gravidez após determinado período de tentativas." },
  { english: "Jaundice", spanish: "Ictericia", portuguese: "Icterícia", category: "OBGYN", definition: "Coloração amarelada da pele e dos olhos causada pelo acúmulo de bilirrubina." },
  { english: "Malignant Tumor", spanish: "Tumor maligno", portuguese: "Tumor maligno", category: "OBGYN", definition: "Crescimento de células anormais que pode invadir tecidos e se espalhar pelo organismo." },
  { english: "Mastectomy", spanish: "Mastectomía", portuguese: "Mastectomia", category: "OBGYN", definition: "Cirurgia para remover total ou parcialmente uma mama." },
  { english: "Mastitis", spanish: "Mastitis", portuguese: "Mastite", category: "OBGYN", definition: "Inflamação do tecido mamário, geralmente associada à amamentação." },
  { english: "Menopause", spanish: "Menopausia", portuguese: "Menopausa", category: "OBGYN", definition: "Fase em que a menstruação cessa permanentemente devido à redução da atividade ovariana." },
  { english: "Menstrual cycle", spanish: "Ciclo menstrual", portuguese: "Ciclo menstrual", category: "OBGYN", definition: "Conjunto de alterações hormonais e uterinas que se repetem entre as menstruações." },
  { english: "Menstrual pad", spanish: "Toalla sanitaria", portuguese: "Absorvente menstrual", category: "OBGYN", definition: "Produto absorvente usado externamente para recolher o fluxo menstrual." },
  { english: "Miscarriage", spanish: "Aborto espontáneo", portuguese: "Aborto espontâneo", category: "OBGYN", definition: "Perda involuntária da gravidez antes de o feto poder sobreviver fora do útero." },
  { english: "Newborn", spanish: "Recién nacido", portuguese: "Recém-nascido", category: "OBGYN", definition: "Bebê durante os primeiros 28 dias de vida." },
  { english: "Ovulation", spanish: "Ovulación", portuguese: "Ovulação", category: "OBGYN", definition: "Liberação de um óvulo maduro pelo ovário." },
  { english: "Pap Smear Test", spanish: "Prueba de Papanicolaou", portuguese: "Exame de Papanicolau", category: "OBGYN", definition: "Exame que coleta células do colo do útero para detectar alterações." },
  { english: "Postpartum depression", spanish: "Depresión posparto", portuguese: "Depressão pós-parto", category: "OBGYN", definition: "Transtorno de humor que pode surgir após o nascimento de um bebê." },
  { english: "Preeclampsia", spanish: "Preeclampsia", portuguese: "Pré-eclâmpsia", category: "OBGYN", definition: "Complicação da gravidez caracterizada por pressão alta e sinais de comprometimento de órgãos." },
  { english: "Premature", spanish: "Prematuro", portuguese: "Prematuro", category: "OBGYN", definition: "Nascido antes de completar 37 semanas de gestação." },
  { english: "Prenatal vitamins", spanish: "Vitaminas prenatales", portuguese: "Vitaminas pré-natais", category: "OBGYN", definition: "Suplementos de vitaminas e minerais usados durante a gestação." },
  { english: "Screening Mammogram", spanish: "Mamografía de cribado", portuguese: "Mamografia de rastreamento", category: "OBGYN", definition: "Exame de imagem das mamas realizado para detectar câncer em pessoas sem sintomas." },
  { english: "STD- Sexually Transmitted Diseases", spanish: "ETS: enfermedades de transmisión sexual", portuguese: "DST — doenças sexualmente transmissíveis", category: "OBGYN", definition: "Infecções transmitidas principalmente por contato sexual." },
  { english: "Tubal Ligation", spanish: "Ligadura de trompas", portuguese: "Laqueadura tubária", category: "OBGYN", definition: "Procedimento que bloqueia ou interrompe as tubas uterinas para evitar a gravidez." },
  { english: "Umbilical cord", spanish: "Cordón umbilical", portuguese: "Cordão umbilical", category: "OBGYN", definition: "Estrutura que liga o feto à placenta e transporta sangue entre eles." },
  { english: "Yeast Infection", spanish: "Infección por levaduras", portuguese: "Infecção por leveduras", category: "OBGYN", definition: "Infecção causada pelo crescimento excessivo de fungos, como Candida." },
  // Tests & Procedures — termos adicionados do MedicalGlossary.pdf
  { english: "Adenoidectomy", spanish: "Adenoidectomía", portuguese: "Adenoidectomia", category: "Tests & Procedures", definition: "Cirurgia para remover as adenoides." },
  { english: "Albumin Test", spanish: "Prueba de albúmina", portuguese: "Exame de albumina", category: "Tests & Procedures", definition: "Exame que mede a concentração de albumina no sangue ou na urina." },
  { english: "Appendectomy", spanish: "Apendicectomía", portuguese: "Apendicectomia", category: "Tests & Procedures", definition: "Cirurgia para remover o apêndice." },
  { english: "Arthroscopy", spanish: "Artroscopia", portuguese: "Artroscopia", category: "Tests & Procedures", definition: "Procedimento que permite examinar e tratar o interior de uma articulação com uma câmera." },
  { english: "Auscultation", spanish: "Auscultación", portuguese: "Ausculta", category: "Tests & Procedures", definition: "Ação de ouvir sons internos do corpo, geralmente com um estetoscópio." },
  { english: "Barium Contrast Test", spanish: "Prueba con contraste de bario", portuguese: "Exame contrastado com bário", category: "Tests & Procedures", definition: "Exame de imagem que usa bário para visualizar partes do trato digestivo." },
  { english: "Biopsy", spanish: "Biopsia", portuguese: "Biópsia", category: "Tests & Procedures", definition: "Coleta de uma amostra de tecido para análise laboratorial." },
  { english: "Blood test", spanish: "Análisis de sangre", portuguese: "Exame de sangue", category: "Tests & Procedures", definition: "Análise laboratorial de uma amostra de sangue." },
  { english: "Blood Transfusion", spanish: "Transfusión de sangre", portuguese: "Transfusão de sangue", category: "Tests & Procedures", definition: "Transferência de sangue ou de componentes sanguíneos para a circulação de uma pessoa." },
  { english: "Bone Density Test", spanish: "Prueba de densidad ósea", portuguese: "Exame de densidade óssea", category: "Tests & Procedures", definition: "Exame que mede a quantidade de minerais nos ossos." },
  { english: "Breast Implant", spanish: "Implante mamario", portuguese: "Implante mamário", category: "Tests & Procedures", definition: "Dispositivo colocado cirurgicamente na mama para alterar seu volume ou formato." },
  { english: "Cataract Surgery", spanish: "Cirugía de cataratas", portuguese: "Cirurgia de catarata", category: "Tests & Procedures", definition: "Procedimento para remover o cristalino opaco e, geralmente, substituí-lo por uma lente artificial." },
  { english: "Catheterization", spanish: "Cateterización", portuguese: "Cateterização", category: "Tests & Procedures", definition: "Introdução de um cateter em uma cavidade, vaso ou órgão do corpo." },
  { english: "Chemotherapy", spanish: "Quimioterapia", portuguese: "Quimioterapia", category: "Tests & Procedures", definition: "Tratamento que utiliza medicamentos para destruir células cancerígenas ou impedir seu crescimento." },
  { english: "Cholecystectomy", spanish: "Colecistectomía", portuguese: "Colecistectomia", category: "Tests & Procedures", definition: "Cirurgia para remover a vesícula biliar." },
  { english: "Circumcision", spanish: "Circuncisión", portuguese: "Circuncisão", category: "Tests & Procedures", definition: "Procedimento cirúrgico que remove o prepúcio, a pele que recobre a extremidade do pênis." },
  { english: "Colon Prep", spanish: "Preparación del colon", portuguese: "Preparo do cólon", category: "Tests & Procedures", definition: "Medidas para esvaziar e limpar o cólon antes de um exame ou procedimento." },
  { english: "Colostomy", spanish: "Colostomía", portuguese: "Colostomia", category: "Tests & Procedures", definition: "Abertura cirúrgica que liga o cólon à superfície do abdome para a saída das fezes." },
  { english: "Contrast Dye", spanish: "Medio de contraste", portuguese: "Meio de contraste", category: "Tests & Procedures", definition: "Substância usada em exames de imagem para tornar determinadas estruturas do corpo mais visíveis." },
  { english: "Cornea Transplant", spanish: "Trasplante de córnea", portuguese: "Transplante de córnea", category: "Tests & Procedures", definition: "Cirurgia que substitui uma córnea doente ou danificada por tecido saudável." },
  { english: "Coronary Artery Bypass", spanish: "Cirugía de revascularización coronaria", portuguese: "Cirurgia de revascularização do miocárdio", category: "Tests & Procedures", definition: "Cirurgia que cria novos caminhos para o sangue contornar artérias coronárias obstruídas." },
  { english: "Creatinine Test", spanish: "Prueba de creatinina", portuguese: "Exame de creatinina", category: "Tests & Procedures", definition: "Exame que mede a creatinina no sangue ou na urina para avaliar a função renal." },
  { english: "Cystoscopy", spanish: "Cistoscopia", portuguese: "Cistoscopia", category: "Tests & Procedures", definition: "Exame que permite observar o interior da bexiga e da uretra com um instrumento fino." },
  { english: "Dilation & Curettage", spanish: "Dilatación y legrado", portuguese: "Dilatação e curetagem", category: "Tests & Procedures", definition: "Procedimento que dilata o colo do útero e remove tecido do interior do útero." },
  { english: "Echocardiogram", spanish: "Ecocardiograma", portuguese: "Ecocardiograma", category: "Tests & Procedures", definition: "Exame de ultrassom que produz imagens do coração e avalia sua estrutura e função." },
  { english: "Esophagogastroduodenoscopy", spanish: "Esofagogastroduodenoscopia", portuguese: "Esofagogastroduodenoscopia", category: "Tests & Procedures", definition: "Exame que visualiza o esôfago, o estômago e o duodeno com um endoscópio." },
  { english: "Electroencephalogram- EEG", spanish: "Electroencefalograma (EEG)", portuguese: "Eletroencefalograma (EEG)", category: "Tests & Procedures", definition: "Exame que registra a atividade elétrica do cérebro por meio de eletrodos no couro cabeludo." },
  { english: "Enema", spanish: "Enema", portuguese: "Enema", category: "Tests & Procedures", definition: "Introdução de líquido no reto para estimular a evacuação ou administrar uma substância." },
  { english: "Epidural Anesthesia", spanish: "Anestesia epidural", portuguese: "Anestesia epidural", category: "Tests & Procedures", definition: "Anestesia aplicada no espaço epidural para reduzir a sensibilidade em áreas do corpo." },
  { english: "Fetal Non Stress Test", spanish: "Prueba fetal sin estrés", portuguese: "Teste fetal sem estresse", category: "Tests & Procedures", definition: "Exame que monitora a frequência cardíaca fetal, geralmente em relação aos movimentos do bebê." },
  { english: "Pumping", spanish: "Extracción de leche", portuguese: "Ordenha", category: "Tests & Procedures", definition: "Ação de retirar leite das mamas manualmente ou com uma bomba extratora." },
  { english: "Glaucoma Test", spanish: "Prueba de glaucoma", portuguese: "Exame para glaucoma", category: "Tests & Procedures", definition: "Avaliação dos olhos que procura sinais de glaucoma, incluindo alterações da pressão ocular e do nervo óptico." },
  { english: "Heel Prick", spanish: "Punción del talón", portuguese: "Punção do calcanhar", category: "Tests & Procedures", definition: "Coleta de uma pequena amostra de sangue por uma punção no calcanhar, comum em recém-nascidos." },
  { english: "Hemodialysis", spanish: "Hemodiálisis", portuguese: "Hemodiálise", category: "Tests & Procedures", definition: "Procedimento que filtra resíduos e excesso de líquido do sangue usando uma máquina." },
  { english: "Hernia Repair Surgery", spanish: "Cirugía de reparación de hernia", portuguese: "Cirurgia de correção de hérnia", category: "Tests & Procedures", definition: "Cirurgia que reposiciona o tecido que sofreu protrusão e reforça a área enfraquecida." },
  { english: "Hip replacement", spanish: "Reemplazo de cadera", portuguese: "Artroplastia do quadril", category: "Tests & Procedures", definition: "Cirurgia que substitui partes danificadas da articulação do quadril por componentes artificiais." },
  { english: "Hysterectomy", spanish: "Histerectomía", portuguese: "Histerectomia", category: "Tests & Procedures", definition: "Cirurgia para remover o útero, total ou parcialmente." },
  { english: "Hysteroscopy", spanish: "Histeroscopia", portuguese: "Histeroscopia", category: "Tests & Procedures", definition: "Exame que permite visualizar o interior do útero com um instrumento fino introduzido pelo colo uterino." },
  { english: "Infusions", spanish: "Infusiones", portuguese: "Infusões", category: "Tests & Procedures", definition: "Administração lenta de líquidos ou medicamentos, geralmente por uma veia." },
  { english: "Intubation", spanish: "Intubación", portuguese: "Intubação", category: "Tests & Procedures", definition: "Introdução de um tubo na traqueia para manter a via aérea aberta ou auxiliar a respiração." },
  { english: "Kegel Exercises", spanish: "Ejercicios de Kegel", portuguese: "Exercícios de Kegel", category: "Tests & Procedures", definition: "Exercícios que fortalecem os músculos do assoalho pélvico por meio de contrações repetidas." },
  { english: "Kidney Function Test", spanish: "Prueba de función renal", portuguese: "Exame de função renal", category: "Tests & Procedures", definition: "Exame que avalia a capacidade dos rins de filtrar o sangue e eliminar resíduos." },
  { english: "Knee replacement", spanish: "Reemplazo de rodilla", portuguese: "Artroplastia do joelho", category: "Tests & Procedures", definition: "Cirurgia que substitui partes danificadas da articulação do joelho por componentes artificiais." },
  { english: "Laparoscopic Surgery", spanish: "Cirugía laparoscópica", portuguese: "Cirurgia laparoscópica", category: "Tests & Procedures", definition: "Procedimento cirúrgico realizado por pequenas incisões, com auxílio de uma câmera e instrumentos finos." },
  { english: "Lipid Panel", spanish: "Perfil lipídico", portuguese: "Perfil lipídico", category: "Tests & Procedures", definition: "Exame de sangue que mede diferentes tipos de gorduras, como colesterol e triglicerídeos." },
  { english: "Lumbar Puncture /Spinal Tap", spanish: "Punción lumbar / punción espinal", portuguese: "Punção lombar", category: "Tests & Procedures", definition: "Procedimento que coleta líquido cefalorraquidiano por meio de uma agulha inserida na região lombar." },
  { english: "Lumpectomy", spanish: "Tumorectomía", portuguese: "Lumpectomia", category: "Tests & Procedures", definition: "Cirurgia para remover um nódulo ou tumor da mama, preservando o restante do tecido mamário." },
  { english: "Mammogram", spanish: "Mamografía", portuguese: "Mamografia", category: "Tests & Procedures", definition: "Exame de imagem que utiliza raios X para avaliar as mamas." },
  { english: "Physical Exam", spanish: "Examen físico", portuguese: "Exame físico", category: "Tests & Procedures", definition: "Avaliação do corpo realizada por um profissional de saúde, com observação, palpação e outros métodos." },
  { english: "Polypectomy/ Polyp Removal", spanish: "Polipectomía / extirpación de pólipos", portuguese: "Polipectomia / remoção de pólipos", category: "Tests & Procedures", definition: "Procedimento para remover pólipos, que são crescimentos anormais em tecidos ou órgãos." },
  { english: "Prostate-Specific Antigen Test (PSA)", spanish: "Prueba del antígeno prostático específico (PSA)", portuguese: "Exame do antígeno prostático específico (PSA)", category: "Tests & Procedures", definition: "Exame de sangue que mede a quantidade de PSA, uma proteína produzida pela próstata." },
  { english: "Screening test", spanish: "Prueba de detección", portuguese: "Exame de rastreamento", category: "Tests & Procedures", definition: "Exame realizado para identificar sinais de uma doença antes do aparecimento de sintomas." },
  { english: "Skin Graft", spanish: "Injerto de piel", portuguese: "Enxerto de pele", category: "Tests & Procedures", definition: "Procedimento que transfere pele de uma área do corpo para cobrir outra área lesionada." },
  { english: "Sleep Study", spanish: "Estudio del sueño", portuguese: "Estudo do sono", category: "Tests & Procedures", definition: "Exame que registra funções do corpo durante o sono para avaliar possíveis alterações." },
  { english: "Sonogram", spanish: "Ecografía", portuguese: "Ultrassonografia", category: "Tests & Procedures", definition: "Exame de imagem que usa ondas sonoras para visualizar estruturas internas do corpo." },
  { english: "Spinal Anesthesia", spanish: "Anestesia espinal", portuguese: "Anestesia raquidiana", category: "Tests & Procedures", definition: "Tipo de anestesia aplicado na região lombar que bloqueia temporariamente a sensibilidade em partes do corpo." },
  { english: "Spirometry Test", spanish: "Prueba de espirometría", portuguese: "Espirometria", category: "Tests & Procedures", definition: "Exame que mede o volume e o fluxo de ar que uma pessoa consegue inspirar e expirar." },
  { english: "Stress test", spanish: "Prueba de esfuerzo", portuguese: "Teste de esforço", category: "Tests & Procedures", definition: "Exame que avalia a resposta do coração ao exercício físico ou a esforço controlado." },
  { english: "Surgery", spanish: "Cirugía", portuguese: "Cirurgia", category: "Tests & Procedures", definition: "Procedimento que utiliza técnicas operatórias para tratar doenças, lesões ou alterações do corpo." },
  { english: "Swab", spanish: "Hisopo", portuguese: "Swab", category: "Tests & Procedures", definition: "Haste com ponta absorvente usada para coletar amostras de secreções ou tecidos." },
  { english: "Swallowing test", spanish: "Prueba de deglución", portuguese: "Exame da deglutição", category: "Tests & Procedures", definition: "Avaliação de como alimentos e líquidos passam da boca para o esôfago." },
  { english: "TB Skin test", spanish: "Prueba cutánea de tuberculosis", portuguese: "Teste cutâneo para tuberculose", category: "Tests & Procedures", definition: "Teste que verifica uma reação na pele após a aplicação de uma substância para avaliar contato com tuberculose." },
  { english: "Tonsillectomy", spanish: "Amigdalectomía", portuguese: "Amigdalectomia", category: "Tests & Procedures", definition: "Cirurgia para remover as amígdalas." },
  { english: "Tracheostomy", spanish: "Traqueostomía", portuguese: "Traqueostomia", category: "Tests & Procedures", definition: "Procedimento que cria uma abertura na traqueia para permitir a passagem de ar." },
  { english: "Upper Endoscopy", spanish: "Endoscopia digestiva alta", portuguese: "Endoscopia digestiva alta", category: "Tests & Procedures", definition: "Exame que observa o esôfago, o estômago e o início do intestino delgado com um tubo flexível." },
  { english: "Urine Test", spanish: "Análisis de orina", portuguese: "Exame de urina", category: "Tests & Procedures", definition: "Análise de uma amostra de urina para verificar características e substâncias relacionadas à saúde." },
  { english: "Uroculture/ Urine Culture", spanish: "Urocultivo / cultivo de orina", portuguese: "Urocultura / cultura de urina", category: "Tests & Procedures", definition: "Exame que procura microrganismos em uma amostra de urina." },
  { english: "Vaginal Douche", spanish: "Ducha vaginal", portuguese: "Ducha vaginal", category: "Tests & Procedures", definition: "Lavagem interna da vagina com líquido, geralmente realizada por meio de um dispositivo." },
  { english: "Vaginoplasty", spanish: "Vaginoplastia", portuguese: "Vaginoplastia", category: "Tests & Procedures", definition: "Cirurgia que reconstrói ou modifica a vagina." },
  { english: "Vital signs check", spanish: "Control de signos vitales", portuguese: "Verificação dos sinais vitais", category: "Tests & Procedures", definition: "Medição de parâmetros como temperatura, pulso, respiração e pressão arterial." },
  { english: "Wound Debridement", spanish: "Desbridamiento de heridas", portuguese: "Desbridamento de feridas", category: "Tests & Procedures", definition: "Remoção de tecido morto ou contaminado de uma ferida para permitir sua avaliação e cicatrização." },
  // Medical Supplies — termos adicionados do MedicalGlossary.pdf
  { english: "Aid Button", spanish: "Botón de asistencia", portuguese: "Botão de chamada", category: "Medical Supplies", definition: "Dispositivo que permite solicitar ajuda ou chamar um profissional de saúde." },
  { english: "Artificial Nipple", spanish: "Pezón artificial", portuguese: "Mamilo artificial", category: "Medical Supplies", definition: "Dispositivo que imita o mamilo e pode ser usado em situações como amamentação ou reconstrução mamária." },
  { english: "Baby bottle", spanish: "Biberón", portuguese: "Mamadeira", category: "Medical Supplies", definition: "Recipiente com bico usado para oferecer leite ou outros líquidos a bebês." },
  { english: "Baby car seat", spanish: "Silla de auto para bebé", portuguese: "Bebê-conforto", category: "Medical Supplies", definition: "Assento de segurança projetado para transportar bebês em veículos." },
  { english: "Bassinet", spanish: "Moisés", portuguese: "Moisés", category: "Medical Supplies", definition: "Leito pequeno, geralmente portátil, destinado a recém-nascidos." },
  { english: "Body lotion", spanish: "Loción corporal", portuguese: "Loção corporal", category: "Medical Supplies", definition: "Produto aplicado à pele para hidratá-la e protegê-la." },
  { english: "Brace", spanish: "Férula", portuguese: "Órtese", category: "Medical Supplies", definition: "Dispositivo que apoia, protege ou limita o movimento de uma parte do corpo." },
  { english: "Breast pump", spanish: "Extractor de leche", portuguese: "Bomba tira-leite", category: "Medical Supplies", definition: "Dispositivo que remove leite das mamas para coleta." },
  { english: "Bulb Syringe", spanish: "Perilla de succión", portuguese: "Seringa de bulbo", category: "Medical Supplies", definition: "Dispositivo em forma de pera usado para aspirar secreções ou líquidos." },
  { english: "Colostomy bags", spanish: "Bolsas de colostomía", portuguese: "Bolsas de colostomia", category: "Medical Supplies", definition: "Bolsas que coletam fezes eliminadas por uma abertura cirúrgica no abdome." },
  { english: "Compression Stockings", spanish: "Medias de compresión", portuguese: "Meias de compressão", category: "Medical Supplies", definition: "Meias que exercem pressão graduada nas pernas para favorecer o retorno venoso." },
  { english: "Condom", spanish: "Preservativo", portuguese: "Preservativo", category: "Medical Supplies", definition: "Barreira usada durante a relação sexual para reduzir o risco de gravidez e infecções." },
  { english: "Container / Cup", spanish: "Recipiente / vaso", portuguese: "Recipiente / copo", category: "Medical Supplies", definition: "Utensílio usado para conter ou oferecer líquidos e outros materiais." },
  { english: "Contraceptive Implant", spanish: "Implante anticonceptivo", portuguese: "Implante contraceptivo", category: "Medical Supplies", definition: "Pequeno dispositivo inserido sob a pele para prevenir a gravidez." },
  { english: "Cotton balls", spanish: "Bolitas de algodón", portuguese: "Bolas de algodão", category: "Medical Supplies", definition: "Pequenas porções de algodão usadas para limpeza ou aplicação de produtos." },
  { english: "Cotton Swab/ Q-tip", spanish: "Hisopo de algodón", portuguese: "Cotonete", category: "Medical Supplies", definition: "Haste com pontas de algodão usada para limpeza ou aplicação localizada." },
  { english: "Crib", spanish: "Cuna", portuguese: "Berço", category: "Medical Supplies", definition: "Leito com laterais de proteção destinado a bebês." },
  { english: "Defibrillator", spanish: "Desfibrilador", portuguese: "Desfibrilador", category: "Medical Supplies", definition: "Aparelho que aplica uma descarga elétrica para tratar certos ritmos cardíacos anormais." },
  { english: "Deodorant", spanish: "Desodorante", portuguese: "Desodorante", category: "Medical Supplies", definition: "Produto usado para reduzir ou disfarçar o odor corporal." },
  { english: "Dressing (for wound)", spanish: "Apósito para heridas", portuguese: "Curativo para ferida", category: "Medical Supplies", definition: "Material colocado sobre uma ferida para protegê-la e auxiliar sua cobertura." },
  { english: "Examination Table", spanish: "Mesa de exploración", portuguese: "Maca de exame", category: "Medical Supplies", definition: "Maca usada para posicionar pacientes durante exames clínicos." },
  { english: "First aid kit", spanish: "Botiquín de primeros auxilios", portuguese: "Kit de primeiros socorros", category: "Medical Supplies", definition: "Conjunto de materiais básicos para prestar cuidados imediatos em lesões." },
  { english: "Fistula", spanish: "Fístula", portuguese: "Fístula", category: "Medical Supplies", definition: "Comunicação anormal entre dois órgãos ou entre um órgão e a pele." },
  { english: "Floss", spanish: "Hilo dental", portuguese: "Fio dental", category: "Medical Supplies", definition: "Fio usado para remover resíduos e placa entre os dentes." },
  { english: "Foley Catheter", spanish: "Sonda Foley", portuguese: "Sonda Foley", category: "Medical Supplies", definition: "Sonda urinária com balão que permanece na bexiga para drenar a urina." },
  { english: "Forceps", spanish: "Pinzas", portuguese: "Pinças", category: "Medical Supplies", definition: "Instrumentos usados para segurar, manipular ou retirar materiais." },
  { english: "Gloves", spanish: "Guantes", portuguese: "Luvas", category: "Medical Supplies", definition: "Peças que cobrem as mãos para protegê-las ou evitar contaminação." },
  { english: "Glucose Monitor/ Glucometer", spanish: "Monitor de glucosa / glucómetro", portuguese: "Monitor de glicose / glicosímetro", category: "Medical Supplies", definition: "Aparelho que mede a concentração de glicose no sangue." },
  { english: "Gown", spanish: "Bata", portuguese: "Avental", category: "Medical Supplies", definition: "Peça de vestuário usada para cobrir o corpo durante cuidados ou procedimentos." },
  { english: "Hand Sanitizer", spanish: "Desinfectante de manos", portuguese: "Antisséptico para as mãos", category: "Medical Supplies", definition: "Produto aplicado às mãos para reduzir microrganismos." },
  { english: "Hearing aid", spanish: "Audífono", portuguese: "Aparelho auditivo", category: "Medical Supplies", definition: "Dispositivo eletrônico que amplifica sons para auxiliar a audição." },
  { english: "Hot compress", spanish: "Compresa caliente", portuguese: "Compressa quente", category: "Medical Supplies", definition: "Material aquecido aplicado sobre o corpo para fornecer calor localizado." },
  { english: "Humidifier", spanish: "Humidificador", portuguese: "Umidificador", category: "Medical Supplies", definition: "Aparelho que aumenta a umidade do ar." },
  { english: "Hydrogen Peroxide", spanish: "Peróxido de hidrógeno", portuguese: "Peróxido de hidrogênio", category: "Medical Supplies", definition: "Substância usada como antisséptico e agente de limpeza." },
  { english: "Ice Pack", spanish: "Bolsa de hielo", portuguese: "Bolsa de gelo", category: "Medical Supplies", definition: "Recipiente frio aplicado ao corpo para reduzir inchaço ou aliviar desconforto." },
  { english: "Immunization Chart/ Records", spanish: "Registro de vacunación", portuguese: "Carteira ou registro de vacinação", category: "Medical Supplies", definition: "Documento que reúne informações sobre vacinas recebidas." },
  { english: "Incentive Spirometer", spanish: "Espirómetro de incentivo", portuguese: "Espirômetro de incentivo", category: "Medical Supplies", definition: "Dispositivo que ajuda a exercitar a respiração profunda." },
  { english: "Incubator (isolette)", spanish: "Incubadora (isolette)", portuguese: "Incubadora (isolette)", category: "Medical Supplies", definition: "Equipamento que mantém recém-nascidos em ambiente controlado." },
  { english: "Lancets", spanish: "Lancetas", portuguese: "Lancetas", category: "Medical Supplies", definition: "Pequenas lâminas usadas para perfurar a pele e obter uma gota de sangue." },
  { english: "Log / Diary", spanish: "Registro o diario", portuguese: "Registro ou diário", category: "Medical Supplies", definition: "Anotações organizadas sobre eventos, sintomas ou informações de saúde." },
  { english: "Mask", spanish: "Mascarilla", portuguese: "Máscara", category: "Medical Supplies", definition: "Dispositivo usado sobre o rosto para proteção ou administração de substâncias." },
  { english: "Mattress", spanish: "Colchón", portuguese: "Colchão", category: "Medical Supplies", definition: "Superfície acolchoada usada para apoiar o corpo durante o repouso." },
  { english: "Metal plate", spanish: "Placa metálica", portuguese: "Placa metálica", category: "Medical Supplies", definition: "Peça de metal usada como suporte ou fixação, inclusive em procedimentos médicos." },
  { english: "Microscope", spanish: "Microscopio", portuguese: "Microscópio", category: "Medical Supplies", definition: "Instrumento que amplia imagens de objetos muito pequenos." },
  { english: "Monitor", spanish: "Monitor", portuguese: "Monitor", category: "Medical Supplies", definition: "Aparelho que exibe ou acompanha informações e sinais." },
  { english: "Moisturizing lotion", spanish: "Loción hidratante", portuguese: "Loção hidratante", category: "Medical Supplies", definition: "Produto aplicado à pele para ajudar a mantê-la hidratada." },
  { english: "Nail clipper", spanish: "Cortaúñas", portuguese: "Cortador de unhas", category: "Medical Supplies", definition: "Instrumento usado para cortar as unhas." },
  { english: "Nails", spanish: "Uñas", portuguese: "Unhas", category: "Medical Supplies", definition: "Estruturas rígidas que recobrem as extremidades dos dedos." },
  { english: "Nasal Spray", spanish: "Aerosol nasal", portuguese: "Spray nasal", category: "Medical Supplies", definition: "Preparação líquida aplicada nas narinas por pulverização." },
  { english: "Nebulizer", spanish: "Nebulizador", portuguese: "Nebulizador", category: "Medical Supplies", definition: "Aparelho que transforma um líquido em névoa para inalação." },
  { english: "Neck Brace/ Neck immobilizer", spanish: "Collarín cervical o inmovilizador de cuello", portuguese: "Colar cervical ou imobilizador de pescoço", category: "Medical Supplies", definition: "Dispositivo que limita os movimentos do pescoço." },
  { english: "NG Tube", spanish: "Sonda nasogástrica", portuguese: "Sonda nasogástrica", category: "Medical Supplies", definition: "Tubo introduzido pelo nariz até o estômago." },
  { english: "Ointment", spanish: "Pomada", portuguese: "Pomada", category: "Medical Supplies", definition: "Preparação semissólida aplicada sobre a pele ou mucosas." },
  { english: "Orthopedic shoes", spanish: "Calzado ortopédico", portuguese: "Calçados ortopédicos", category: "Medical Supplies", definition: "Calçados projetados para oferecer suporte ou acomodar necessidades dos pés." },
  { english: "Otoscope", spanish: "Otoscopio", portuguese: "Otoscópio", category: "Medical Supplies", definition: "Instrumento usado para examinar o canal auditivo e o tímpano." },
  { english: "Outpatient Procedure", spanish: "Procedimiento ambulatorio", portuguese: "Procedimento ambulatorial", category: "Medical Supplies", definition: "Procedimento realizado sem necessidade de internação hospitalar." },
  { english: "Oximeter", spanish: "Oxímetro", portuguese: "Oxímetro", category: "Medical Supplies", definition: "Aparelho que mede a saturação de oxigênio no sangue." },
  { english: "Oxygen Tank", spanish: "Tanque de oxígeno", portuguese: "Cilindro de oxigênio", category: "Medical Supplies", definition: "Recipiente que armazena oxigênio para uso médico." },
  { english: "Pacemaker", spanish: "Marcapasos", portuguese: "Marca-passo", category: "Medical Supplies", definition: "Dispositivo implantado que ajuda a regular o ritmo cardíaco." },
  { english: "Medical Chart", spanish: "Historia clínica", portuguese: "Prontuário médico", category: "Medical Supplies", definition: "Conjunto de registros sobre a saúde e os atendimentos de uma pessoa." },
  { english: "Petroleum Jelly/ Vaseline", spanish: "Vaselina", portuguese: "Vaselina", category: "Medical Supplies", definition: "Substância oleosa usada para proteger e hidratar a pele." },
  { english: "Prosthesis", spanish: "Prótesis", portuguese: "Prótese", category: "Medical Supplies", definition: "Dispositivo que substitui uma parte ausente do corpo ou sua função." },
  { english: "Scale", spanish: "Báscula", portuguese: "Balança", category: "Medical Supplies", definition: "Instrumento usado para medir o peso de uma pessoa ou objeto." },
  { english: "Scalpel / Surgical Knife", spanish: "Bisturí / cuchillo quirúrgico", portuguese: "Bisturi / faca cirúrgica", category: "Medical Supplies", definition: "Instrumento de lâmina usado para realizar cortes em procedimentos cirúrgicos." },
  { english: "Scope", spanish: "Endoscopio", portuguese: "Endoscópio", category: "Medical Supplies", definition: "Instrumento com câmera usado para examinar o interior do corpo." },
  { english: "Screws", spanish: "Tornillos", portuguese: "Parafusos", category: "Medical Supplies", definition: "Fixadores usados para estabilizar ossos ou componentes de dispositivos médicos." },
  { english: "Sensor", spanish: "Sensor", portuguese: "Sensor", category: "Medical Supplies", definition: "Dispositivo que detecta e mede alterações ou sinais fisiológicos." },
  { english: "Sharps Container", spanish: "Contenedor para objetos punzocortantes", portuguese: "Coletor de materiais perfurocortantes", category: "Medical Supplies", definition: "Recipiente rígido para descartar agulhas e outros materiais perfurocortantes com segurança." },
  { english: "Shunt", spanish: "Derivación", portuguese: "Derivação", category: "Medical Supplies", definition: "Dispositivo ou conexão que desvia o fluxo de um fluido corporal." },
  { english: "Sling", spanish: "Cabestrillo", portuguese: "Tipoia", category: "Medical Supplies", definition: "Suporte de tecido que sustenta e imobiliza um braço." },
  { english: "Speculum", spanish: "Espéculo", portuguese: "Espéculo", category: "Medical Supplies", definition: "Instrumento usado para manter aberta uma cavidade corporal durante o exame." },
  { english: "Splint", spanish: "Férula", portuguese: "Tala", category: "Medical Supplies", definition: "Suporte rígido usado para imobilizar ou proteger uma parte do corpo." },
  { english: "Staples", spanish: "Grapas quirúrgicas", portuguese: "Grampos cirúrgicos", category: "Medical Supplies", definition: "Pequenos grampos metálicos usados para fechar incisões ou feridas." },
  { english: "Stent", spanish: "Stent", portuguese: "Stent", category: "Medical Supplies", definition: "Pequeno tubo inserido em um vaso ou canal para mantê-lo aberto." },
  { english: "Stitches /sutures", spanish: "Puntos / suturas", portuguese: "Pontos / suturas", category: "Medical Supplies", definition: "Fios ou outros materiais usados para aproximar e fechar tecidos." },
  { english: "Stool Sample Cards", spanish: "Tarjetas para muestras de heces", portuguese: "Cartões para amostras de fezes", category: "Medical Supplies", definition: "Cartões usados para coletar ou acondicionar amostras de fezes para análise." },
  { english: "Stretcher", spanish: "Camilla", portuguese: "Maca", category: "Medical Supplies", definition: "Estrutura usada para transportar pessoas deitadas." },
  { english: "String - (IUD)", spanish: "Hilo del DIU", portuguese: "Fio do DIU", category: "Medical Supplies", definition: "Fio preso ao DIU que se estende até a vagina." },
  { english: "Strips", spanish: "Tiras", portuguese: "Tiras", category: "Medical Supplies", definition: "Faixas estreitas usadas em testes ou aplicações médicas." },
  { english: "Stroller", spanish: "Cochecito", portuguese: "Carrinho de bebê", category: "Medical Supplies", definition: "Carrinho com rodas usado para transportar um bebê ou criança pequena." },
  { english: "Surgical Mesh", spanish: "Malla quirúrgica", portuguese: "Tela cirúrgica", category: "Medical Supplies", definition: "Material em rede implantado para reforçar tecidos ou reparar hérnias." },
  { english: "Syrup", spanish: "Jarabe", portuguese: "Xarope", category: "Medical Supplies", definition: "Preparação líquida viscosa, frequentemente usada como veículo para medicamentos." },
  { english: "Tampons", spanish: "Tampones", portuguese: "Absorventes internos", category: "Medical Supplies", definition: "Produtos absorventes inseridos na vagina para reter o fluxo menstrual." },
  { english: "Thermometer", spanish: "Termómetro", portuguese: "Termômetro", category: "Medical Supplies", definition: "Instrumento usado para medir a temperatura corporal ou de outras substâncias." },
  { english: "Treadmill", spanish: "Cinta de correr", portuguese: "Esteira ergométrica", category: "Medical Supplies", definition: "Equipamento com superfície móvel usado para caminhar ou correr em ambiente interno." },
  { english: "Tongue depressor", spanish: "Bajalenguas", portuguese: "Abaixador de língua", category: "Medical Supplies", definition: "Haste usada para pressionar a língua durante o exame da boca e da garganta." },
  { english: "Tweezers", spanish: "Pinzas", portuguese: "Pinça", category: "Medical Supplies", definition: "Instrumento usado para segurar ou remover objetos pequenos." },
  { english: "Urinal", spanish: "Orinal", portuguese: "Papagaio", category: "Medical Supplies", definition: "Recipiente usado por pessoas acamadas para urinar." },
  { english: "Vaporizer", spanish: "Vaporizador", portuguese: "Vaporizador", category: "Medical Supplies", definition: "Aparelho que transforma um líquido em vapor ou névoa." },
  { english: "Ventilator", spanish: "Ventilador mecánico", portuguese: "Ventilador mecânico", category: "Medical Supplies", definition: "Equipamento que auxilia ou substitui a respiração espontânea." },
  { english: "Walker", spanish: "Andador", portuguese: "Andador", category: "Medical Supplies", definition: "Dispositivo de apoio que ajuda uma pessoa a caminhar com mais estabilidade." },
  { english: "Wristband/ bracelet", spanish: "Pulsera / brazalete", portuguese: "Pulseira de identificação", category: "Medical Supplies", definition: "Faixa usada no pulso para identificar uma pessoa ou registrar informações médicas." },
  // Symptoms & Conditions — termos adicionados do MedicalGlossary.pdf
  { english: "Abortion", spanish: "Aborto", portuguese: "Aborto", category: "Symptoms & Conditions", definition: "Interrupção espontânea ou provocada da gestação antes da viabilidade fetal." },
  { english: "Allergic reaction", spanish: "Reacción alérgica", portuguese: "Reação alérgica", category: "Symptoms & Conditions", definition: "Resposta do sistema imunológico a uma substância que reconhece como potencialmente nociva." },
  { english: "Arrhythmia", spanish: "Arritmia", portuguese: "Arritmia", category: "Symptoms & Conditions", definition: "Alteração do ritmo ou da frequência dos batimentos cardíacos." },
  { english: "Bad smell / foul smelling", spanish: "Mal olor / con mal olor", portuguese: "Mau cheiro / com odor desagradável", category: "Symptoms & Conditions", definition: "Odor desagradável que pode estar associado a secreções, feridas ou outras condições." },
  { english: "Bedbugs", spanish: "Chinches", portuguese: "Percevejos", category: "Symptoms & Conditions", definition: "Insetos parasitas que se alimentam de sangue e podem picar pessoas." },
  { english: "Bedridden", spanish: "Postrado en cama", portuguese: "Acamado", category: "Symptoms & Conditions", definition: "Pessoa que permanece deitada na cama por incapacidade ou necessidade de repouso." },
  { english: "Bedsore", spanish: "Úlcera por presión", portuguese: "Lesão por pressão", category: "Symptoms & Conditions", definition: "Lesão da pele e dos tecidos causada por pressão prolongada sobre uma região do corpo." },
  { english: "Birthmark/ mole", spanish: "Marca de nacimiento / lunar", portuguese: "Marca de nascença / pinta", category: "Symptoms & Conditions", definition: "Marca presente desde o nascimento ou mancha pigmentada que aparece na pele." },
  { english: "Bite", spanish: "Mordedura / picadura", portuguese: "Mordida / picada", category: "Symptoms & Conditions", definition: "Ferimento causado pelos dentes ou pelo ferrão de um animal ou inseto." },
  { english: "Blurry vision / blurred", spanish: "Visión borrosa / borroso", portuguese: "Visão embaçada / embaçado", category: "Symptoms & Conditions", definition: "Alteração visual que dificulta enxergar imagens com nitidez." },
  { english: "Body Fluids", spanish: "Líquidos corporales", portuguese: "Fluidos corporais", category: "Symptoms & Conditions", definition: "Líquidos produzidos pelo organismo, como sangue, saliva, urina e suor." },
  { english: "Boil", spanish: "Forúnculo", portuguese: "Furúnculo", category: "Symptoms & Conditions", definition: "Infecção profunda de um folículo piloso que forma uma lesão com pus." },
  { english: "Bowel movement", spanish: "Evacuación intestinal", portuguese: "Evacuação intestinal", category: "Symptoms & Conditions", definition: "Eliminação das fezes pelo intestino através do ânus." },
  { english: "Burp", spanish: "Eructar", portuguese: "Arrotar", category: "Symptoms & Conditions", definition: "Expelir pela boca gases provenientes do estômago." },
  { english: "Calcification", spanish: "Calcificación", portuguese: "Calcificação", category: "Symptoms & Conditions", definition: "Depósito de sais de cálcio em tecidos ou estruturas do organismo." },
  { english: "Callus", spanish: "Callo", portuguese: "Calosidade", category: "Symptoms & Conditions", definition: "Espessamento da pele causado por pressão ou atrito repetido." },
  { english: "Colostrum", spanish: "Calostro", portuguese: "Colostro", category: "Symptoms & Conditions", definition: "Primeiro leite produzido após o parto, rico em nutrientes e anticorpos." },
  { english: "Chipped", spanish: "Astillado", portuguese: "Lascado", category: "Symptoms & Conditions", definition: "Que sofreu uma pequena quebra ou perdeu parte da superfície." },
  { english: "Cholesterol", spanish: "Colesterol", portuguese: "Colesterol", category: "Symptoms & Conditions", definition: "Substância gordurosa presente no sangue e necessária ao funcionamento do organismo." },
  { english: "Connective tissue", spanish: "Tejido conjuntivo", portuguese: "Tecido conjuntivo", category: "Symptoms & Conditions", definition: "Tecido que sustenta, conecta e protege outras estruturas do corpo." },
  { english: "Contagious/ communicable", spanish: "Contagioso / transmisible", portuguese: "Contagioso / transmissível", category: "Symptoms & Conditions", definition: "Que pode passar de uma pessoa para outra, direta ou indiretamente." },
  { english: "Cough up", spanish: "Expectorar", portuguese: "Expectorar", category: "Symptoms & Conditions", definition: "Expelir muco ou secreções das vias respiratórias pela tosse." },
  { english: "Cramping", spanish: "Cólicos / calambres", portuguese: "Cólicas / cãibras", category: "Symptoms & Conditions", definition: "Contrações dolorosas ou espasmos, geralmente em órgãos ou músculos." },
  { english: "Cravings", spanish: "Antojos", portuguese: "Desejos intensos", category: "Symptoms & Conditions", definition: "Vontades fortes e específicas de consumir certos alimentos ou substâncias." },
  { english: "Crooked", spanish: "Torcido", portuguese: "Torto", category: "Symptoms & Conditions", definition: "Que não está alinhado ou apresenta uma forma irregular." },
  { english: "Cyst", spanish: "Quiste", portuguese: "Cisto", category: "Symptoms & Conditions", definition: "Bolsa fechada que pode conter líquido, ar ou material semissólido." },
  { english: "Deficiency", spanish: "Deficiencia", portuguese: "Deficiência", category: "Symptoms & Conditions", definition: "Falta ou quantidade insuficiente de uma substância ou função necessária ao organismo." },
  { english: "Deformity / Malformation", spanish: "Deformidad / malformación", portuguese: "Deformidade / malformação", category: "Symptoms & Conditions", definition: "Alteração da forma ou da estrutura de uma parte do corpo." },
  { english: "Dehydrated", spanish: "Deshidratado", portuguese: "Desidratado", category: "Symptoms & Conditions", definition: "Que perdeu mais água do que o organismo consegue repor adequadamente." },
  { english: "Discharge", spanish: "Secreción", portuguese: "Secreção / corrimento", category: "Symptoms & Conditions", definition: "Substância liberada por tecidos ou órgãos, como muco, pus ou líquido vaginal." },
  { english: "Discomfort", spanish: "Malestar", portuguese: "Desconforto", category: "Symptoms & Conditions", definition: "Sensação desagradável ou incômoda, que pode ocorrer em diferentes partes do corpo." },
  { english: "Disorder", spanish: "Trastorno", portuguese: "Transtorno", category: "Symptoms & Conditions", definition: "Alteração da saúde ou do funcionamento físico ou mental." },
  { english: "Distress", spanish: "Angustia", portuguese: "Sofrimento", category: "Symptoms & Conditions", definition: "Estado de intenso desconforto físico ou emocional." },
  { english: "Disturbance", spanish: "Alteración", portuguese: "Alteração", category: "Symptoms & Conditions", definition: "Mudança ou comprometimento de uma função ou condição habitual do organismo." },
  { english: "Drain / Drainage", spanish: "Drenar / Drenaje", portuguese: "Drenar / Drenagem", category: "Symptoms & Conditions", definition: "Saída ou remoção de líquido de uma região do corpo." },
  { english: "Draw Blood", spanish: "Extraer sangre", portuguese: "Coletar sangue", category: "Symptoms & Conditions", definition: "Realizar a coleta de uma amostra de sangue, geralmente por punção de uma veia." },
  { english: "Dripping", spanish: "Goteo", portuguese: "Gotejamento", category: "Symptoms & Conditions", definition: "Queda lenta e contínua de gotas de um líquido." },
  { english: "Drowsiness", spanish: "Somnolencia", portuguese: "Sonolência", category: "Symptoms & Conditions", definition: "Sensação de sono ou dificuldade para permanecer acordado." },
  { english: "Drowsy", spanish: "Somnoliento", portuguese: "Sonolento", category: "Symptoms & Conditions", definition: "Que sente sono ou tem dificuldade para permanecer alerta." },
  { english: "Dry cough", spanish: "Tos seca", portuguese: "Tosse seca", category: "Symptoms & Conditions", definition: "Tosse sem produção significativa de muco ou secreção." },
  { english: "Dust mite", spanish: "Ácaro del polvo", portuguese: "Ácaro da poeira", category: "Symptoms & Conditions", definition: "Pequeno organismo presente na poeira doméstica, capaz de desencadear alergias." },
  { english: "Ear wax", spanish: "Cerumen", portuguese: "Cerúmen", category: "Symptoms & Conditions", definition: "Substância produzida no canal auditivo que ajuda a protegê-lo." },
  { english: "Enlarged Prostate", spanish: "Próstata agrandada", portuguese: "Próstata aumentada", category: "Symptoms & Conditions", definition: "Aumento do volume da próstata, que pode pressionar a uretra." },
  { english: "Fainting spells", spanish: "Episodios de desmayo", portuguese: "Episódios de desmaio", category: "Symptoms & Conditions", definition: "Episódios breves de perda de consciência, geralmente com recuperação espontânea." },
  { english: "Fibers", spanish: "Fibras", portuguese: "Fibras", category: "Symptoms & Conditions", definition: "Filamentos ou estruturas alongadas presentes em tecidos ou materiais biológicos." },
  { english: "Fissure", spanish: "Fisura", portuguese: "Fissura", category: "Symptoms & Conditions", definition: "Pequena rachadura ou abertura linear em um tecido do corpo." },
  { english: "Flare-up", spanish: "Reagudización", portuguese: "Exacerbação", category: "Symptoms & Conditions", definition: "Piora temporária ou intensificação dos sinais de uma condição." },
  { english: "Fluid / Water Retention", spanish: "Retención de líquidos", portuguese: "Retenção de líquidos", category: "Symptoms & Conditions", definition: "Acúmulo excessivo de líquido nos tecidos do corpo." },
  { english: "Food poisoning", spanish: "Intoxicación alimentaria", portuguese: "Intoxicação alimentar", category: "Symptoms & Conditions", definition: "Doença causada pela ingestão de alimentos contaminados por microrganismos ou toxinas." },
  { english: "Funny taste", spanish: "Sabor extraño", portuguese: "Gosto estranho", category: "Symptoms & Conditions", definition: "Percepção de um gosto incomum ou desagradável na boca." },
  { english: "Gain weight", spanish: "Aumentar de peso", portuguese: "Ganhar peso", category: "Symptoms & Conditions", definition: "Aumentar a massa corporal ao longo do tempo." },
  { english: "Give Birth/ Deliver", spanish: "Dar a luz", portuguese: "Dar à luz", category: "Symptoms & Conditions", definition: "Ter um bebê ao final da gestação, por parto vaginal ou cesariana." },
  { english: "Glucose", spanish: "Glucosa", portuguese: "Glicose", category: "Symptoms & Conditions", definition: "Açúcar que circula no sangue e serve como fonte de energia para as células." },
  { english: "Goosebumps", spanish: "Piel de gallina", portuguese: "Arrepios", category: "Symptoms & Conditions", definition: "Pequenas elevações da pele que podem surgir com frio ou emoção." },
  { english: "Gout", spanish: "Gota", portuguese: "Gota", category: "Symptoms & Conditions", definition: "Forma de artrite causada pelo acúmulo de cristais de ácido úrico nas articulações." },
  { english: "Hair loss", spanish: "Caída del cabello", portuguese: "Queda de cabelo", category: "Symptoms & Conditions", definition: "Perda de fios de cabelo além da renovação habitual." },
  { english: "Handicapped", spanish: "Con discapacidad", portuguese: "Com deficiência", category: "Symptoms & Conditions", definition: "Termo inglês datado; prefira “person with a disability”. Refere-se a pessoa com impedimentos de longo prazo que podem limitar sua participação em atividades." },
  { english: "Heart Rate", spanish: "Frecuencia cardíaca", portuguese: "Frequência cardíaca", category: "Symptoms & Conditions", definition: "Número de batimentos do coração por minuto." },
  { english: "Heartburn", spanish: "Acidez estomacal", portuguese: "Azia", category: "Symptoms & Conditions", definition: "Sensação de queimação no peito ou na parte superior do abdome, associada ao refluxo." },
  { english: "Hematoma", spanish: "Hematoma", portuguese: "Hematoma", category: "Symptoms & Conditions", definition: "Acúmulo de sangue fora dos vasos sanguíneos, geralmente após uma lesão." },
  { english: "Hiatal Hernia", spanish: "Hernia de hiato", portuguese: "Hérnia de hiato", category: "Symptoms & Conditions", definition: "Protrusão de parte do estômago através do diafragma, em direção ao tórax." },
  { english: "Hiccups", spanish: "Hipo", portuguese: "Soluços", category: "Symptoms & Conditions", definition: "Contrações involuntárias do diafragma que causam sons curtos e repetidos." },
  { english: "High blood sugar", spanish: "Nivel alto de azúcar en la sangre", portuguese: "Glicemia alta", category: "Symptoms & Conditions", definition: "Concentração de glicose no sangue acima do intervalo esperado." },
  { english: "Hoarseness", spanish: "Ronquera", portuguese: "Rouquidão", category: "Symptoms & Conditions", definition: "Alteração da voz que pode deixá-la áspera, fraca ou soprosa." },
  { english: "Hot flashes", spanish: "Sofocos", portuguese: "Ondas de calor", category: "Symptoms & Conditions", definition: "Sensações repentinas de calor intenso, geralmente no rosto e na parte superior do corpo." },
  { english: "Hypothermia", spanish: "Hipotermia", portuguese: "Hipotermia", category: "Symptoms & Conditions", definition: "Queda da temperatura corporal para níveis perigosamente baixos." },
  { english: "Imbalance", spanish: "Desequilibrio", portuguese: "Desequilíbrio", category: "Symptoms & Conditions", definition: "Dificuldade para manter a estabilidade do corpo ao ficar em pé ou caminhar." },
  { english: "Incontinence", spanish: "Incontinencia", portuguese: "Incontinência", category: "Symptoms & Conditions", definition: "Perda involuntária do controle da urina, das fezes ou de ambos." },
  { english: "Junk food", spanish: "Comida chatarra", portuguese: "Comida pouco saudável", category: "Symptoms & Conditions", definition: "Alimento geralmente rico em calorias, açúcar, sal ou gorduras e pobre em nutrientes." },
  { english: "Kidney Stones", spanish: "Cálculos renales", portuguese: "Cálculos renais", category: "Symptoms & Conditions", definition: "Depósitos endurecidos de minerais que se formam nos rins." },
  { english: "Lactose Intolerance", spanish: "Intolerancia a la lactosa", portuguese: "Intolerância à lactose", category: "Symptoms & Conditions", definition: "Dificuldade para digerir a lactose, um açúcar presente no leite." },
  { english: "Leakage", spanish: "Escape", portuguese: "Escape", category: "Symptoms & Conditions", definition: "Saída involuntária ou não controlada de líquido ou outra substância." },
  { english: "Lethargic", spanish: "Letárgico", portuguese: "Letárgico", category: "Symptoms & Conditions", definition: "Estado de sonolência intensa, lentidão ou pouca resposta aos estímulos." },
  { english: "Lightheaded / Groggy", spanish: "Aturdido / atontado", portuguese: "Com sensação de desmaio / grogue", category: "Symptoms & Conditions", definition: "Sensação de tontura, fraqueza ou lentidão mental." },
  { english: "Lining", spanish: "Revestimiento", portuguese: "Revestimento", category: "Symptoms & Conditions", definition: "Camada de tecido que recobre a superfície interna de uma estrutura do corpo." },
  { english: "Listless", spanish: "Apático", portuguese: "Apático", category: "Symptoms & Conditions", definition: "Estado de pouca energia, interesse ou disposição para atividades." },
  { english: "Loose", spanish: "Suelto", portuguese: "Solto", category: "Symptoms & Conditions", definition: "Que não está firme, apertado ou preso; pode descrever fezes pouco consistentes." },
  { english: "Lower back pain", spanish: "Dolor lumbar", portuguese: "Dor lombar", category: "Symptoms & Conditions", definition: "Dor na parte inferior das costas, entre as costelas e a pelve." },
  { english: "Lump / bulge", spanish: "Bulto / protuberancia", portuguese: "Nódulo / saliência", category: "Symptoms & Conditions", definition: "Elevação ou massa localizada que pode ser percebida sob a pele ou em um tecido." },
  { english: "Malnutrition", spanish: "Desnutrición", portuguese: "Desnutrição", category: "Symptoms & Conditions", definition: "Estado causado por ingestão ou absorção insuficiente de nutrientes." },
  { english: "Migraine headaches", spanish: "Cefaleas migrañosas", portuguese: "Enxaquecas", category: "Symptoms & Conditions", definition: "Dores de cabeça recorrentes que podem vir acompanhadas de náusea e sensibilidade à luz." },
  { english: "Mood Swings", spanish: "Cambios de humor", portuguese: "Oscilações de humor", category: "Symptoms & Conditions", definition: "Mudanças perceptíveis no estado emocional ao longo do tempo." },
  { english: "Myoma / Fibroid", spanish: "Mioma / fibroma", portuguese: "Mioma / fibroma", category: "Symptoms & Conditions", definition: "Tumor benigno formado por tecido muscular, geralmente localizado no útero." },
  { english: "Narrowing", spanish: "Estrechamiento", portuguese: "Estreitamento", category: "Symptoms & Conditions", definition: "Redução da largura ou do diâmetro de uma estrutura corporal." },
  { english: "Obstruction / Blockage", spanish: "Obstrucción / bloqueo", portuguese: "Obstrução / bloqueio", category: "Symptoms & Conditions", definition: "Impedimento parcial ou completo da passagem por uma estrutura do corpo." },
  { english: "Outbreak", spanish: "Brote", portuguese: "Surto", category: "Symptoms & Conditions", definition: "Aparecimento repentino ou aumento de casos de uma doença ou condição." },
  { english: "Palpitations", spanish: "Palpitaciones", portuguese: "Palpitações", category: "Symptoms & Conditions", definition: "Percepção incômoda dos batimentos cardíacos, que podem parecer rápidos ou irregulares." },
  { english: "Paralysis", spanish: "Parálisis", portuguese: "Paralisia", category: "Symptoms & Conditions", definition: "Perda total ou parcial da capacidade de movimentar uma parte do corpo." },
  { english: "Pass gas", spanish: "Expulsar gases", portuguese: "Eliminar gases", category: "Symptoms & Conditions", definition: "Ação de liberar gases acumulados no intestino pelo ânus." },
  { english: "Pelvic pain", spanish: "Dolor pélvico", portuguese: "Dor pélvica", category: "Symptoms & Conditions", definition: "Dor na região inferior do abdome, entre os quadris." },
  { english: "Phlegm", spanish: "Flema", portuguese: "Catarro", category: "Symptoms & Conditions", definition: "Secreção espessa produzida pelas vias respiratórias, geralmente expelida ao tossir." },
  { english: "Pimples", spanish: "Espinillas", portuguese: "Espinhas", category: "Symptoms & Conditions", definition: "Pequenas lesões na pele, frequentemente associadas à acne." },
  { english: "Pinched nerve", spanish: "Nervio pinzado", portuguese: "Nervo comprimido", category: "Symptoms & Conditions", definition: "Compressão de um nervo que pode causar dor, formigamento ou fraqueza." },
  { english: "Pollen", spanish: "Polen", portuguese: "Pólen", category: "Symptoms & Conditions", definition: "Pó produzido pelas plantas, que pode desencadear alergias." },
  { english: "Polyps", spanish: "Pólipos", portuguese: "Pólipos", category: "Symptoms & Conditions", definition: "Crescimentos anormais de tecido que podem surgir em órgãos ou mucosas." },
  { english: "Poor appetite", spanish: "Falta de apetito", portuguese: "Falta de apetite", category: "Symptoms & Conditions", definition: "Redução do desejo de comer." },
  { english: "Postnasal drip", spanish: "Goteo posnasal", portuguese: "Gotejamento pós-nasal", category: "Symptoms & Conditions", definition: "Escorrimento de muco pela parte posterior do nariz em direção à garganta." },
  { english: "Prescribe", spanish: "Recetar", portuguese: "Prescrever", category: "Symptoms & Conditions", definition: "Indicar formalmente um medicamento ou procedimento para uma pessoa." },
  { english: "Productive cough", spanish: "Tos productiva", portuguese: "Tosse produtiva", category: "Symptoms & Conditions", definition: "Tosse que elimina secreções das vias respiratórias." },
  { english: "Pruritus (itching)", spanish: "Prurito (picazón)", portuguese: "Prurido (coceira)", category: "Symptoms & Conditions", definition: "Sensação na pele que provoca vontade de coçar." },
  { english: "Pulled muscle/ torn muscle", spanish: "Distensión muscular / desgarro muscular", portuguese: "Distensão muscular / ruptura muscular", category: "Symptoms & Conditions", definition: "Lesão causada pelo estiramento excessivo ou rompimento de fibras musculares." },
  { english: "Quadriplegic", spanish: "Tetrapléjico", portuguese: "Tetraplégico", category: "Symptoms & Conditions", definition: "Pessoa com paralisia dos braços e das pernas." },
  { english: "Refer", spanish: "Derivar", portuguese: "Encaminhar", category: "Symptoms & Conditions", definition: "Direcionar uma pessoa a outro profissional ou serviço de saúde." },
  { english: "Relapse", spanish: "Recaída", portuguese: "Recaída", category: "Symptoms & Conditions", definition: "Retorno ou piora de uma doença após um período de melhora." },
  { english: "Resolve / Go away", spanish: "Resolverse / desaparecer", portuguese: "Resolver-se / desaparecer", category: "Symptoms & Conditions", definition: "Deixar de existir ou melhorar até que o problema não esteja mais presente." },
  { english: "Rhinitis", spanish: "Rinitis", portuguese: "Rinite", category: "Symptoms & Conditions", definition: "Inflamação da mucosa nasal, que pode causar congestão, coriza e espirros." },
  { english: "Runny nose", spanish: "Moqueo", portuguese: "Nariz escorrendo", category: "Symptoms & Conditions", definition: "Saída de secreção pelo nariz." },
  { english: "Scales", spanish: "Escamas", portuguese: "Escamas", category: "Symptoms & Conditions", definition: "Pequenas placas de pele que se soltam, como pode ocorrer em algumas doenças dermatológicas." },
  { english: "Scar", spanish: "Cicatriz", portuguese: "Cicatriz", category: "Symptoms & Conditions", definition: "Marca formada na pele ou em outro tecido durante a cicatrização." },
  { english: "Sciatica", spanish: "Ciática", portuguese: "Ciática", category: "Symptoms & Conditions", definition: "Dor que se irradia pelo trajeto do nervo ciático, geralmente da lombar até a perna." },
  { english: "Seizures", spanish: "Convulsiones", portuguese: "Convulsões", category: "Symptoms & Conditions", definition: "Episódios de atividade cerebral anormal que podem causar movimentos involuntários ou alterações da consciência." },
  { english: "Shaky hands", spanish: "Manos temblorosas", portuguese: "Mãos trêmulas", category: "Symptoms & Conditions", definition: "Tremor involuntário das mãos." },
  { english: "Side effects", spanish: "Efectos secundarios", portuguese: "Efeitos colaterais", category: "Symptoms & Conditions", definition: "Efeitos não desejados que podem ocorrer com o uso de um medicamento." },
  { english: "Skin tag", spanish: "Acrocordón", portuguese: "Acrocórdon", category: "Symptoms & Conditions", definition: "Pequena projeção benigna de pele, geralmente macia e presa por uma base estreita." },
  { english: "Sneeze", spanish: "Estornudar", portuguese: "Espirrar", category: "Symptoms & Conditions", definition: "Expelir ar bruscamente pelo nariz e pela boca, geralmente por irritação nasal." },
  { english: "Snore", spanish: "Roncar", portuguese: "Roncar", category: "Symptoms & Conditions", definition: "Produzir ruído respiratório durante o sono." },
  { english: "Spasms/ Colics", spanish: "Espasmos / cólicos", portuguese: "Espasmos / cólicas", category: "Symptoms & Conditions", definition: "Contrações involuntárias, por vezes dolorosas, de músculos ou órgãos." },
  { english: "Spit", spanish: "Escupir", portuguese: "Cuspir", category: "Symptoms & Conditions", definition: "Expelir saliva ou outra substância pela boca." },
  { english: "Spores", spanish: "Esporas", portuguese: "Esporos", category: "Symptoms & Conditions", definition: "Estruturas microscópicas usadas por fungos e algumas plantas para reprodução e dispersão." },
  { english: "Spotting", spanish: "Manchado", portuguese: "Pequeno sangramento", category: "Symptoms & Conditions", definition: "Sangramento leve, geralmente fora do período menstrual esperado." },
  { english: "Sprain", spanish: "Esguince", portuguese: "Entorse", category: "Symptoms & Conditions", definition: "Lesão de um ligamento causada por torção ou alongamento excessivo de uma articulação." },
  { english: "Stabbing/ Sharp Pain", spanish: "Dolor punzante", portuguese: "Dor em pontada", category: "Symptoms & Conditions", definition: "Dor súbita e localizada, descrita como uma pontada ou sensação de perfuração." },
  { english: "Stiffness", spanish: "Rigidez", portuguese: "Rigidez", category: "Symptoms & Conditions", definition: "Dificuldade ou desconforto para movimentar uma parte do corpo." },
  { english: "Strained Muscle", spanish: "Distensión muscular", portuguese: "Distensão muscular", category: "Symptoms & Conditions", definition: "Lesão causada pelo alongamento excessivo ou rompimento de fibras musculares." },
  { english: "Stuffy Nose", spanish: "Congestión nasal", portuguese: "Nariz entupido", category: "Symptoms & Conditions", definition: "Sensação de obstrução nasal, geralmente causada por inchaço da mucosa ou excesso de secreção." },
  { english: "Suicidal Thoughts", spanish: "Pensamientos suicidas", portuguese: "Pensamentos suicidas", category: "Symptoms & Conditions", definition: "Pensamentos relacionados a tirar a própria vida ou à possibilidade de fazê-lo." },
  { english: "Tachycardia", spanish: "Taquicardia", portuguese: "Taquicardia", category: "Symptoms & Conditions", definition: "Aumento da frequência dos batimentos cardíacos acima do esperado para a situação." },
  { english: "Tantrum", spanish: "Rabieta", portuguese: "Birra", category: "Symptoms & Conditions", definition: "Episódio de comportamento intenso, como choro ou gritos, geralmente em resposta à frustração." },
  { english: "Tenderness", spanish: "Sensibilidad al tacto", portuguese: "Sensibilidade ao toque", category: "Symptoms & Conditions", definition: "Dor ou desconforto provocado ao tocar ou pressionar uma região do corpo." },
  { english: "Drooling", spanish: "Babeo", portuguese: "Salivação excessiva", category: "Symptoms & Conditions", definition: "Saída involuntária de saliva pela boca." },
  { english: "Thickening", spanish: "Engrosamiento", portuguese: "Espessamento", category: "Symptoms & Conditions", definition: "Aumento da espessura de um tecido ou estrutura do corpo." },
  { english: "Tinnitus", spanish: "Acúfenos", portuguese: "Zumbido no ouvido", category: "Symptoms & Conditions", definition: "Percepção de sons, como zumbidos ou apitos, sem uma fonte sonora externa." },
  { english: "To have (a test/surgery)", spanish: "Hacerse (un examen o una cirugía)", portuguese: "Fazer (um exame ou uma cirurgia)", category: "Symptoms & Conditions", definition: "Submeter-se à realização de um exame ou procedimento cirúrgico." },
  { english: "done", spanish: "Realizado", portuguese: "Realizado", category: "Symptoms & Conditions", definition: "Indica que uma ação, exame ou procedimento foi concluído." },
  { english: "Tremors", spanish: "Temblores", portuguese: "Tremores", category: "Symptoms & Conditions", definition: "Movimentos involuntários e rítmicos de uma parte do corpo." },
  { english: "Triggers", spanish: "Desencadenantes", portuguese: "Gatilhos", category: "Symptoms & Conditions", definition: "Fatores que provocam ou intensificam um sintoma ou uma reação." },
  { english: "Triglycerides", spanish: "Triglicéridos", portuguese: "Triglicerídeos", category: "Symptoms & Conditions", definition: "Tipo de gordura presente no sangue, usado pelo corpo como fonte de energia." },
  { english: "Tumor", spanish: "Tumor", portuguese: "Tumor", category: "Symptoms & Conditions", definition: "Massa anormal formada pelo crescimento de células; pode ser benigna ou maligna." },
  { english: "Twitch", spanish: "Espasmo", portuguese: "Contração involuntária", category: "Symptoms & Conditions", definition: "Contração súbita e involuntária de um músculo ou grupo muscular." },
  { english: "Upset Stomach", spanish: "Malestar estomacal", portuguese: "Desconforto no estômago", category: "Symptoms & Conditions", definition: "Sensação desagradável no estômago, que pode incluir enjoo ou indigestão." },
  { english: "Varicose Veins", spanish: "Várices", portuguese: "Varizes", category: "Symptoms & Conditions", definition: "Veias dilatadas e tortuosas, geralmente visíveis sob a pele." },
  { english: "Vomit/ throw up", spanish: "Vomitar", portuguese: "Vomitar", category: "Symptoms & Conditions", definition: "Expulsar pela boca o conteúdo do estômago." },
  { english: "Wart", spanish: "Verruga", portuguese: "Verruga", category: "Symptoms & Conditions", definition: "Pequeno crescimento na pele, geralmente causado por uma infecção viral." },
  { english: "Weight loss", spanish: "Pérdida de peso", portuguese: "Perda de peso", category: "Symptoms & Conditions", definition: "Diminuição do peso corporal ao longo do tempo." },
  { english: "Welt", spanish: "Roncha", portuguese: "Vergão", category: "Symptoms & Conditions", definition: "Elevação avermelhada e localizada na pele, frequentemente associada a coceira." },
  { english: "Wheezing", spanish: "Sibilancias", portuguese: "Chiado no peito", category: "Symptoms & Conditions", definition: "Ruído agudo ao respirar, causado pela passagem de ar por vias respiratórias estreitadas." },
  { english: "Whiplash", spanish: "Latigazo cervical", portuguese: "Lesão em chicote", category: "Symptoms & Conditions", definition: "Lesão no pescoço causada por movimento brusco de aceleração e desaceleração." },
  { english: "Withdrawal", spanish: "Abstinencia", portuguese: "Abstinência", category: "Symptoms & Conditions", definition: "Conjunto de sintomas que pode ocorrer após reduzir ou interromper o uso de uma substância." },
  // Types of Pain — termos adicionados do MedicalGlossary.pdf
  { english: "Crushing Pain", spanish: "Dolor opresivo intenso", portuguese: "Dor opressiva intensa", category: "Types of Pain", definition: "Dor intensa descrita como pressão ou aperto que parece esmagar a região afetada." },
  { english: "Unbearable pain", spanish: "Dolor insoportable", portuguese: "Dor insuportável", category: "Types of Pain", definition: "Dor de intensidade extrema, difícil ou impossível de tolerar." },
  { english: "Fleeting Pain", spanish: "Dolor pasajero", portuguese: "Dor passageira", category: "Types of Pain", definition: "Dor que aparece brevemente e desaparece em pouco tempo." },
  { english: "Mild/ Slight pain", spanish: "Dolor leve", portuguese: "Dor leve", category: "Types of Pain", definition: "Dor de baixa intensidade, geralmente pouco incômoda." },
  { english: "Numbing pain", spanish: "Dolor con sensación de entumecimiento", portuguese: "Dor com sensação de dormência", category: "Types of Pain", definition: "Dor acompanhada de redução ou perda temporária da sensibilidade." },
  { english: "Pins and needles", spanish: "Hormigueo", portuguese: "Formigamento", category: "Types of Pain", definition: "Sensação de picadas ou agulhadas na pele, frequentemente acompanhada de dormência." },
  { english: "Sudden Pain", spanish: "Dolor repentino", portuguese: "Dor súbita", category: "Types of Pain", definition: "Dor que começa de maneira inesperada e rápida." },
  // Types of Medications — termos adicionados do MedicalGlossary.pdf
  { english: "Antacid", spanish: "Antiácido", portuguese: "Antiácido", category: "Types of Medications", definition: "Substância que neutraliza o ácido presente no estômago." },
  { english: "Anticonvulsant", spanish: "Anticonvulsivo", portuguese: "Anticonvulsivante", category: "Types of Medications", definition: "Medicamento usado para prevenir ou controlar convulsões." },
  { english: "Antibiotic", spanish: "Antibiótico", portuguese: "Antibiótico", category: "Types of Medications", definition: "Medicamento que combate infecções causadas por bactérias." },
  { english: "Antipyretic", spanish: "Antipirético", portuguese: "Antipirético", category: "Types of Medications", definition: "Medicamento usado para reduzir a febre." },
  { english: "Antitussive", spanish: "Antitusivo", portuguese: "Antitussígeno", category: "Types of Medications", definition: "Medicamento que reduz ou suprime a tosse." },
  { english: "Capsules", spanish: "Cápsulas", portuguese: "Cápsulas", category: "Types of Medications", definition: "Formas farmacêuticas que contêm uma dose do medicamento envolta por uma cobertura." },
  { english: "Clear liquids", spanish: "Líquidos claros", portuguese: "Líquidos claros", category: "Types of Medications", definition: "Bebidas transparentes, como água, caldos coados e sucos sem polpa." },
  { english: "Contraceptive", spanish: "Anticonceptivo", portuguese: "Contraceptivo", category: "Types of Medications", definition: "Método ou produto usado para prevenir a gravidez." },
  { english: "Corticosteroids", spanish: "Corticosteroides", portuguese: "Corticosteroides", category: "Types of Medications", definition: "Medicamentos que reduzem a inflamação e modificam a resposta imunológica." },
  { english: "Cough drops", spanish: "Pastillas para la tos", portuguese: "Pastilhas para tosse", category: "Types of Medications", definition: "Pastilhas dissolvidas na boca para aliviar a irritação da garganta ou a tosse." },
  { english: "Diuretic", spanish: "Diurético", portuguese: "Diurético", category: "Types of Medications", definition: "Substância que aumenta a produção e a eliminação de urina." },
  { english: "Electrolytes", spanish: "Electrolitos", portuguese: "Eletrólitos", category: "Types of Medications", definition: "Minerais com carga elétrica que ajudam a regular funções do organismo." },
  { english: "Fiber", spanish: "Fibra", portuguese: "Fibra", category: "Types of Medications", definition: "Componente de alimentos vegetais que auxilia o funcionamento intestinal." },
  { english: "Gel", spanish: "Gel", portuguese: "Gel", category: "Types of Medications", definition: "Forma semissólida de medicamento, geralmente aplicada sobre a pele." },
  { english: "Generic medication", spanish: "Medicamento genérico", portuguese: "Medicamento genérico", category: "Types of Medications", definition: "Medicamento com o mesmo princípio ativo de um medicamento de referência." },
  { english: "Herbal tea", spanish: "Té de hierbas", portuguese: "Chá de ervas", category: "Types of Medications", definition: "Bebida preparada pela infusão de folhas, flores ou outras partes de plantas." },
  { english: "Implant", spanish: "Implante", portuguese: "Implante", category: "Types of Medications", definition: "Dispositivo colocado no organismo para liberar uma substância ou cumprir outra função médica." },
  { english: "Inhaler", spanish: "Inhalador", portuguese: "Inalador", category: "Types of Medications", definition: "Dispositivo que administra medicamentos para serem inalados." },
  { english: "Inhibitors", spanish: "Inhibidores", portuguese: "Inibidores", category: "Types of Medications", definition: "Substâncias que bloqueiam ou reduzem a atividade de processos ou moléculas do organismo." },
  { english: "Insulin", spanish: "Insulina", portuguese: "Insulina", category: "Types of Medications", definition: "Hormônio que ajuda a controlar a quantidade de glicose no sangue." },
  { english: "Laxative", spanish: "Laxante", portuguese: "Laxante", category: "Types of Medications", definition: "Substância que facilita a evacuação intestinal." },
  { english: "Lozenges/ cough drops", spanish: "Pastillas para la garganta y la tos", portuguese: "Pastilhas para garganta e tosse", category: "Types of Medications", definition: "Pastilhas dissolvidas na boca para aliviar a irritação da garganta e a tosse." },
  { english: "Muscle relaxant", spanish: "Relajante muscular", portuguese: "Relaxante muscular", category: "Types of Medications", definition: "Medicamento que reduz a tensão ou os espasmos musculares." },
  { english: "NSAID", spanish: "AINE", portuguese: "AINE", category: "Types of Medications", definition: "Sigla em inglês para anti-inflamatório não esteroidal, classe de medicamentos que reduz dor e inflamação." },
  { english: "Over the counter medication", spanish: "Medicamento de venta libre", portuguese: "Medicamento isento de prescrição", category: "Types of Medications", definition: "Medicamento que pode ser adquirido sem receita médica." },
  { english: "Overdose", spanish: "Sobredosis", portuguese: "Superdosagem", category: "Types of Medications", definition: "Exposição a uma quantidade de medicamento ou substância maior que a segura ou prescrita." },
  { english: "Ovules", spanish: "Óvulos", portuguese: "Óvulos", category: "Types of Medications", definition: "Formas farmacêuticas sólidas que se introduzem na vagina e se dissolvem à temperatura corporal." },
  { english: "Painkiller/ pain reliever", spanish: "Analgésico", portuguese: "Analgésico", category: "Types of Medications", definition: "Medicamento usado para aliviar a dor." },
  { english: "Patch", spanish: "Parche", portuguese: "Adesivo transdérmico", category: "Types of Medications", definition: "Forma adesiva que libera medicamento pela pele durante determinado período." },
  { english: "Pills", spanish: "Pastillas", portuguese: "Comprimidos", category: "Types of Medications", definition: "Medicamentos sólidos ingeridos por via oral." },
  { english: "Powder", spanish: "Polvo", portuguese: "Pó", category: "Types of Medications", definition: "Medicamento em partículas secas, que pode ser ingerido ou dissolvido antes do uso." },
  { english: "Sitz bath", spanish: "Baño de asiento", portuguese: "Banho de assento", category: "Types of Medications", definition: "Imersão da região pélvica em água, geralmente em recipiente próprio." },
  { english: "Softgel", spanish: "Cápsula blanda", portuguese: "Cápsula gelatinosa mole", category: "Types of Medications", definition: "Cápsula flexível, geralmente de gelatina, que contém medicamento líquido ou semissólido." },
  { english: "Space Chamber", spanish: "Cámara espaciadora", portuguese: "Câmara espaçadora", category: "Types of Medications", definition: "Dispositivo acoplado ao inalador que facilita a inalação do medicamento." },
  { english: "Steroid", spanish: "Esteroide", portuguese: "Esteroide", category: "Types of Medications", definition: "Substância com estrutura esteroidal; alguns esteroides são usados como medicamentos anti-inflamatórios." },
  { english: "Stool Softener", spanish: "Ablandador de heces", portuguese: "Amolecedor de fezes", category: "Types of Medications", definition: "Medicamento que aumenta a umidade das fezes e facilita sua evacuação." },
  { english: "Sublingual", spanish: "Sublingual", portuguese: "Sublingual", category: "Types of Medications", definition: "Administrado ou absorvido sob a língua." },
  { english: "Tablets", spanish: "Comprimidos", portuguese: "Comprimidos", category: "Types of Medications", definition: "Formas sólidas de medicamento, geralmente produzidas por compressão e administradas por via oral." },
  { english: "Vaginal cream", spanish: "Crema vaginal", portuguese: "Creme vaginal", category: "Types of Medications", definition: "Preparação cremosa destinada à aplicação na vagina." },
  // Diseases & Conditions — termos adicionados do MedicalGlossary.pdf
  { english: "Alopecia", spanish: "Alopecia", portuguese: "Alopecia", category: "Diseases & Conditions", definition: "Perda parcial ou total de cabelos ou pelos." },
  { english: "Alzheimer", spanish: "Enfermedad de Alzheimer", portuguese: "Doença de Alzheimer", category: "Diseases & Conditions", definition: "Doença neurodegenerativa progressiva que afeta a memória, o pensamento e outras funções cognitivas." },
  { english: "ALS", spanish: "ELA (esclerosis lateral amiotrófica)", portuguese: "ELA (esclerose lateral amiotrófica)", category: "Diseases & Conditions", definition: "Doença neurodegenerativa que afeta os neurônios motores e causa fraqueza muscular progressiva." },
  { english: "Anaphylactic shock", spanish: "Choque anafiláctico", portuguese: "Choque anafilático", category: "Diseases & Conditions", definition: "Reação alérgica grave e súbita que pode comprometer a respiração e a circulação." },
  { english: "Aneurysm", spanish: "Aneurisma", portuguese: "Aneurisma", category: "Diseases & Conditions", definition: "Dilatação anormal de um vaso sanguíneo, causada pelo enfraquecimento de sua parede." },
  { english: "Anorexia", spanish: "Anorexia", portuguese: "Anorexia", category: "Diseases & Conditions", definition: "Transtorno alimentar marcado por restrição persistente da alimentação e medo intenso de ganhar peso." },
  { english: "Arthritis", spanish: "Artritis", portuguese: "Artrite", category: "Diseases & Conditions", definition: "Inflamação de uma ou mais articulações, que pode causar dor e rigidez." },
  { english: "Athlete's foot", spanish: "Pie de atleta", portuguese: "Pé de atleta", category: "Diseases & Conditions", definition: "Infecção fúngica da pele, geralmente entre os dedos dos pés." },
  { english: "Atrial Fibrillation", spanish: "Fibrilación auricular", portuguese: "Fibrilação atrial", category: "Diseases & Conditions", definition: "Alteração do ritmo cardíaco com batimentos rápidos e irregulares nas câmaras superiores do coração." },
  { english: "Autism", spanish: "Autismo", portuguese: "Autismo", category: "Diseases & Conditions", definition: "Condição do neurodesenvolvimento que afeta a comunicação, a interação social e os comportamentos." },
  { english: "Autoimmune disease", spanish: "Enfermedad autoinmunitaria", portuguese: "Doença autoimune", category: "Diseases & Conditions", definition: "Condição em que o sistema imunológico ataca células ou tecidos do próprio organismo." },
  { english: "Bell Palsy", spanish: "Parálisis de Bell", portuguese: "Paralisia de Bell", category: "Diseases & Conditions", definition: "Fraqueza ou paralisia súbita dos músculos de um lado do rosto." },
  { english: "Bipolar disorder", spanish: "Trastorno bipolar", portuguese: "Transtorno bipolar", category: "Diseases & Conditions", definition: "Transtorno do humor caracterizado por episódios de mania ou hipomania e de depressão." },
  { english: "Black Lung Disease", spanish: "Neumoconiosis de los trabajadores del carbón", portuguese: "Pneumoconiose dos trabalhadores do carvão", category: "Diseases & Conditions", definition: "Doença pulmonar causada pela inalação prolongada de poeira de carvão." },
  { english: "Blindness", spanish: "Ceguera", portuguese: "Cegueira", category: "Diseases & Conditions", definition: "Perda total ou grave da visão." },
  { english: "Blood disorders", spanish: "Trastornos de la sangre", portuguese: "Distúrbios do sangue", category: "Diseases & Conditions", definition: "Condições que afetam as células sanguíneas, a coagulação ou outros componentes do sangue." },
  { english: "Brain Damage", spanish: "Daño cerebral", portuguese: "Dano cerebral", category: "Diseases & Conditions", definition: "Lesão ou alteração que afeta a estrutura ou o funcionamento do cérebro." },
  { english: "Breast Cancer", spanish: "Cáncer de mama", portuguese: "Câncer de mama", category: "Diseases & Conditions", definition: "Doença em que células anormais da mama se multiplicam sem controle." },
  { english: "Bulimia Nervosa", spanish: "Bulimia nerviosa", portuguese: "Bulimia nervosa", category: "Diseases & Conditions", definition: "Transtorno alimentar caracterizado por episódios de compulsão alimentar e comportamentos compensatórios." },
  { english: "Bursitis", spanish: "Bursitis", portuguese: "Bursite", category: "Diseases & Conditions", definition: "Inflamação de uma bursa, pequena bolsa que reduz o atrito entre tecidos." },
  { english: "Carpal Tunnel Syndrome", spanish: "Síndrome del túnel carpiano", portuguese: "Síndrome do túnel do carpo", category: "Diseases & Conditions", definition: "Compressão do nervo mediano ao passar pelo túnel do carpo no punho." },
  { english: "Cerebral Palsy", spanish: "Parálisis cerebral", portuguese: "Paralisia cerebral", category: "Diseases & Conditions", definition: "Grupo de condições que afetam permanentemente o movimento e a postura, decorrentes de lesão cerebral precoce." },
  { english: "Cervical Cancer", spanish: "Cáncer de cuello uterino", portuguese: "Câncer do colo do útero", category: "Diseases & Conditions", definition: "Câncer que se origina nas células do colo do útero." },
  { english: "Chancre", spanish: "Chancro", portuguese: "Cancro", category: "Diseases & Conditions", definition: "Úlcera geralmente indolor que pode surgir no local de entrada de certos agentes infecciosos." },
  { english: "Chickenpox", spanish: "Varicela", portuguese: "Catapora", category: "Diseases & Conditions", definition: "Infecção viral contagiosa que costuma causar febre e erupção de bolhas na pele." },
  { english: "Chlamydia", spanish: "Clamidia", portuguese: "Clamídia", category: "Diseases & Conditions", definition: "Infecção sexualmente transmissível causada pela bactéria Chlamydia trachomatis." },
  { english: "Cholera", spanish: "Cólera", portuguese: "Cólera", category: "Diseases & Conditions", definition: "Infecção intestinal causada por bactéria, que pode provocar diarreia aquosa intensa." },
  { english: "Chronic Kidney Disease", spanish: "Enfermedad renal crónica", portuguese: "Doença renal crônica", category: "Diseases & Conditions", definition: "Perda persistente da função dos rins ao longo do tempo." },
  { english: "Cleft Palate", spanish: "Paladar hendido", portuguese: "Fenda palatina", category: "Diseases & Conditions", definition: "Abertura congênita no céu da boca, causada pela união incompleta de tecidos durante o desenvolvimento." },
  { english: "Clotting disorder", spanish: "Trastorno de la coagulación", portuguese: "Distúrbio da coagulação", category: "Diseases & Conditions", definition: "Alteração que dificulta ou desregula a formação de coágulos sanguíneos." },
  { english: "Colitis", spanish: "Colitis", portuguese: "Colite", category: "Diseases & Conditions", definition: "Inflamação do cólon, parte do intestino grosso." },
  { english: "Collapsed Lung", spanish: "Colapso pulmonar", portuguese: "Colapso pulmonar", category: "Diseases & Conditions", definition: "Perda parcial ou total da expansão de um pulmão, frequentemente associada à entrada de ar no espaço pleural." },
  { english: "Coma", spanish: "Coma", portuguese: "Coma", category: "Diseases & Conditions", definition: "Estado profundo de inconsciência no qual a pessoa não pode ser despertada." },
  { english: "Communicable Disease", spanish: "Enfermedad transmisible", portuguese: "Doença transmissível", category: "Diseases & Conditions", definition: "Doença causada por agente infeccioso que pode passar de uma pessoa ou fonte para outra." },
  { english: "Concussion", spanish: "Conmoción cerebral", portuguese: "Concussão cerebral", category: "Diseases & Conditions", definition: "Lesão cerebral leve causada por impacto ou movimento brusco da cabeça." },
  { english: "Congenital heart defects", spanish: "Defectos cardíacos congénitos", portuguese: "Defeitos cardíacos congênitos", category: "Diseases & Conditions", definition: "Alterações na estrutura do coração presentes desde o nascimento." },
  { english: "Crohn's Disease", spanish: "Enfermedad de Crohn", portuguese: "Doença de Crohn", category: "Diseases & Conditions", definition: "Doença inflamatória crônica que pode afetar diferentes partes do trato digestivo." },
  { english: "Cystic Fibrosis", spanish: "Fibrosis quística", portuguese: "Fibrose cística", category: "Diseases & Conditions", definition: "Doença genética que causa acúmulo de muco espesso em órgãos, especialmente nos pulmões e no pâncreas." },
  { english: "Cytomegalovirus (CMV)", spanish: "Citomegalovirus (CMV)", portuguese: "Citomegalovírus (CMV)", category: "Diseases & Conditions", definition: "Vírus comum que pode causar infecção persistente e sintomas graves em pessoas vulneráveis." },
  { english: "Deafness", spanish: "Sordera", portuguese: "Surdez", category: "Diseases & Conditions", definition: "Perda total ou parcial da capacidade de ouvir." },
  { english: "Deep Vein Thrombosis (DVT)", spanish: "Trombosis venosa profunda (TVP)", portuguese: "Trombose venosa profunda (TVP)", category: "Diseases & Conditions", definition: "Formação de um coágulo em uma veia profunda, geralmente nas pernas." },
  { english: "Dementia", spanish: "Demencia", portuguese: "Demência", category: "Diseases & Conditions", definition: "Conjunto de alterações cognitivas que prejudicam a memória, o pensamento e as atividades cotidianas." },
  { english: "Dermatitis", spanish: "Dermatitis", portuguese: "Dermatite", category: "Diseases & Conditions", definition: "Inflamação da pele que pode causar vermelhidão, coceira ou descamação." },
  { english: "Developmental Delay", spanish: "Retraso del desarrollo", portuguese: "Atraso no desenvolvimento", category: "Diseases & Conditions", definition: "Aquisição mais lenta de habilidades esperadas para a idade, como linguagem ou movimento." },
  { english: "Diaper rash", spanish: "Dermatitis del pañal", portuguese: "Assadura de fralda", category: "Diseases & Conditions", definition: "Irritação da pele na região coberta pela fralda." },
  { english: "Diphtheria", spanish: "Difteria", portuguese: "Difteria", category: "Diseases & Conditions", definition: "Infecção bacteriana que afeta principalmente a garganta e pode dificultar a respiração." },
  { english: "Diverticulitis", spanish: "Diverticulitis", portuguese: "Diverticulite", category: "Diseases & Conditions", definition: "Inflamação de divertículos, pequenas bolsas que podem se formar na parede do intestino." },
  { english: "Dysplasia", spanish: "Displasia", portuguese: "Displasia", category: "Diseases & Conditions", definition: "Desenvolvimento ou crescimento anormal de células, tecidos ou órgãos." },
  { english: "Dysuria (painful urination)", spanish: "Disuria (micción dolorosa)", portuguese: "Disúria (micção dolorosa)", category: "Diseases & Conditions", definition: "Dor ou desconforto ao urinar." },
  { english: "E. coli", spanish: "E. coli", portuguese: "E. coli", category: "Diseases & Conditions", definition: "Bactéria que pode viver no intestino; algumas cepas causam doenças." },
  { english: "Ebola Virus", spanish: "Virus del Ébola", portuguese: "Vírus Ebola", category: "Diseases & Conditions", definition: "Vírus que causa uma doença grave, frequentemente caracterizada por febre e hemorragias." },
  { english: "Elephantiasis", spanish: "Elefantiasis", portuguese: "Elefantíase", category: "Diseases & Conditions", definition: "Aumento intenso de uma parte do corpo, geralmente associado à obstrução de vasos linfáticos." },
  { english: "Encephalitis", spanish: "Encefalitis", portuguese: "Encefalite", category: "Diseases & Conditions", definition: "Inflamação do tecido cerebral, frequentemente causada por uma infecção." },
  { english: "Endometriosis", spanish: "Endometriosis", portuguese: "Endometriose", category: "Diseases & Conditions", definition: "Condição em que tecido semelhante ao revestimento do útero cresce fora dele." },
  { english: "Epilepsy", spanish: "Epilepsia", portuguese: "Epilepsia", category: "Diseases & Conditions", definition: "Condição neurológica caracterizada por predisposição a crises epilépticas recorrentes." },
  { english: "Epstein-Barr Virus Infection", spanish: "Infección por el virus de Epstein-Barr", portuguese: "Infecção pelo vírus Epstein-Barr", category: "Diseases & Conditions", definition: "Infecção causada pelo vírus Epstein-Barr, que pode provocar mononucleose infecciosa." },
  { english: "Erectile Dysfunction", spanish: "Disfunción eréctil", portuguese: "Disfunção erétil", category: "Diseases & Conditions", definition: "Dificuldade persistente para obter ou manter uma ereção suficiente para a atividade sexual." },
  { english: "Fatty Liver", spanish: "Hígado graso", portuguese: "Esteatose hepática (fígado gorduroso)", category: "Diseases & Conditions", definition: "Acúmulo excessivo de gordura nas células do fígado." },
  { english: "Fetal Distress (fetus)", spanish: "Sufrimiento fetal", portuguese: "Sofrimento fetal", category: "Diseases & Conditions", definition: "Sinal de que o feto pode não estar recebendo oxigênio suficiente ou enfrenta outra dificuldade." },
  { english: "Fibromyalgia", spanish: "Fibromialgia", portuguese: "Fibromialgia", category: "Diseases & Conditions", definition: "Condição crônica que causa dor generalizada, fadiga e, frequentemente, alterações do sono." },
  { english: "Flu / Influenza", spanish: "Gripe / influenza", portuguese: "Gripe / influenza", category: "Diseases & Conditions", definition: "Infecção respiratória causada pelos vírus influenza." },
  { english: "Folliculitis", spanish: "Foliculitis", portuguese: "Foliculite", category: "Diseases & Conditions", definition: "Inflamação dos folículos pilosos, geralmente causada por infecção ou irritação." },
  { english: "Fungal Infection / mycotic inf.", spanish: "Infección por hongos / infección micótica", portuguese: "Infecção fúngica / infecção micótica", category: "Diseases & Conditions", definition: "Infecção causada por fungos, que pode afetar diferentes partes do corpo." },
  { english: "Gastroenteritis", spanish: "Gastroenteritis", portuguese: "Gastroenterite", category: "Diseases & Conditions", definition: "Inflamação do estômago e do intestino, frequentemente causando diarreia e vômitos." },
  { english: "German Measles / Rubella", spanish: "Rubéola", portuguese: "Rubéola", category: "Diseases & Conditions", definition: "Infecção viral contagiosa que pode causar erupção cutânea e febre baixa." },
  { english: "Goiter", spanish: "Bocio", portuguese: "Bócio", category: "Diseases & Conditions", definition: "Aumento do volume da glândula tireoide." },
  { english: "Gonorrhea", spanish: "Gonorrea", portuguese: "Gonorreia", category: "Diseases & Conditions", definition: "Infecção sexualmente transmissível causada pela bactéria Neisseria gonorrhoeae." },
  { english: "Group B Strep Infection", spanish: "Infección por estreptococo del grupo B", portuguese: "Infecção por estreptococo do grupo B", category: "Diseases & Conditions", definition: "Infecção causada pela bactéria Streptococcus do grupo B." },
  { english: "Guillain-Barré Syndrome", spanish: "Síndrome de Guillain-Barré", portuguese: "Síndrome de Guillain-Barré", category: "Diseases & Conditions", definition: "Doença neurológica em que o sistema imunológico ataca nervos periféricos, causando fraqueza." },
  { english: "Hand, foot and mouth disease", spanish: "Enfermedad de manos, pies y boca", portuguese: "Doença mão-pé-boca", category: "Diseases & Conditions", definition: "Infecção viral contagiosa que costuma causar feridas na boca e lesões nas mãos e nos pés." },
  { english: "Cleft lip", spanish: "Labio hendido / fisura labial", portuguese: "Fissura labial", category: "Diseases & Conditions", definition: "Abertura congênita no lábio superior, decorrente de falha de fusão durante o desenvolvimento fetal." },
  { english: "Hearing Impaired", spanish: "Persona con discapacidad auditiva", portuguese: "Pessoa com deficiência auditiva", category: "Diseases & Conditions", definition: "Pessoa com redução ou ausência da capacidade de ouvir." },
  { english: "Hearing loss", spanish: "Pérdida auditiva", portuguese: "Perda auditiva", category: "Diseases & Conditions", definition: "Redução parcial ou total da capacidade de ouvir." },
  { english: "Heart attack", spanish: "Infarto de miocardio", portuguese: "Infarto do miocárdio", category: "Diseases & Conditions", definition: "Lesão do músculo cardíaco causada pela interrupção do fluxo sanguíneo em uma artéria coronária." },
  { english: "Heart murmur", spanish: "Soplo cardíaco", portuguese: "Sopro cardíaco", category: "Diseases & Conditions", definition: "Ruído adicional ouvido durante a ausculta do coração, causado pelo fluxo sanguíneo." },
  { english: "Helicobacter Pylori (H. Pylori)", spanish: "Helicobacter pylori (H. pylori)", portuguese: "Helicobacter pylori (H. pylori)", category: "Diseases & Conditions", definition: "Bactéria que pode colonizar o estômago e está associada a gastrite e úlceras." },
  { english: "Hemophilia", spanish: "Hemofilia", portuguese: "Hemofilia", category: "Diseases & Conditions", definition: "Distúrbio hereditário da coagulação que dificulta a interrupção de sangramentos." },
  { english: "Hemorrhoids", spanish: "Hemorroides", portuguese: "Hemorroidas", category: "Diseases & Conditions", definition: "Veias dilatadas na região do ânus ou na parte inferior do reto." },
  { english: "Hereditary diseases", spanish: "Enfermedades hereditarias", portuguese: "Doenças hereditárias", category: "Diseases & Conditions", definition: "Condições transmitidas dos pais aos filhos por meio de alterações genéticas." },
  { english: "Herpes", spanish: "Herpes", portuguese: "Herpes", category: "Diseases & Conditions", definition: "Infecção causada por vírus que pode provocar lesões na pele ou nas mucosas." },
  { english: "Hydrocephalus", spanish: "Hidrocefalia", portuguese: "Hidrocefalia", category: "Diseases & Conditions", definition: "Acúmulo excessivo de líquido cefalorraquidiano nos espaços do cérebro." },
  { english: "Hyperglycemia", spanish: "Hiperglucemia", portuguese: "Hiperglicemia", category: "Diseases & Conditions", definition: "Nível de glicose no sangue acima do intervalo considerado normal." },
  { english: "Hypertension", spanish: "Hipertensión", portuguese: "Hipertensão", category: "Diseases & Conditions", definition: "Aumento persistente da pressão do sangue nas artérias." },
  { english: "Hyperthyroidism", spanish: "Hipertiroidismo", portuguese: "Hipertireoidismo", category: "Diseases & Conditions", definition: "Produção excessiva de hormônios pela glândula tireoide." },
  { english: "Hypoglycemia", spanish: "Hipoglucemia", portuguese: "Hipoglicemia", category: "Diseases & Conditions", definition: "Nível de glicose no sangue abaixo do intervalo considerado normal." },
  { english: "Hypothyroidism", spanish: "Hipotiroidismo", portuguese: "Hipotireoidismo", category: "Diseases & Conditions", definition: "Produção insuficiente de hormônios pela glândula tireoide." },
  { english: "Hypotonia", spanish: "Hipotonía", portuguese: "Hipotonia", category: "Diseases & Conditions", definition: "Redução do tônus muscular, que pode causar menor resistência ao movimento." },
  { english: "Impetigo", spanish: "Impétigo", portuguese: "Impetigo", category: "Diseases & Conditions", definition: "Infecção bacteriana superficial da pele, geralmente com bolhas ou crostas." },
  { english: "Inflammatory bowel disease- IBD", spanish: "Enfermedad inflamatoria intestinal (EII)", portuguese: "Doença inflamatória intestinal (DII)", category: "Diseases & Conditions", definition: "Grupo de doenças crônicas que causam inflamação no trato digestivo." },
  { english: "Intellectual Disability", spanish: "Discapacidad intelectual", portuguese: "Deficiência intelectual", category: "Diseases & Conditions", definition: "Condição que envolve limitações no funcionamento intelectual e no comportamento adaptativo." },
  { english: "Kawasaki Disease", spanish: "Enfermedad de Kawasaki", portuguese: "Doença de Kawasaki", category: "Diseases & Conditions", definition: "Doença que causa inflamação dos vasos sanguíneos, principalmente em crianças." },
  { english: "Kidney Failure / Renal Failure", spanish: "Insuficiencia renal", portuguese: "Insuficiência renal", category: "Diseases & Conditions", definition: "Perda parcial ou completa da capacidade dos rins de filtrar o sangue." },
  { english: "Lead Poisoning", spanish: "Intoxicación por plomo", portuguese: "Intoxicação por chumbo", category: "Diseases & Conditions", definition: "Acúmulo de chumbo no organismo em níveis capazes de causar danos." },
  { english: "Leprosy", spanish: "Lepra", portuguese: "Hanseníase", category: "Diseases & Conditions", definition: "Doença infecciosa crônica que afeta principalmente a pele e os nervos periféricos." },
  { english: "Leptospirosis", spanish: "Leptospirosis", portuguese: "Leptospirose", category: "Diseases & Conditions", definition: "Infecção bacteriana geralmente adquirida pelo contato com água ou solo contaminados." },
  { english: "Leukemia", spanish: "Leucemia", portuguese: "Leucemia", category: "Diseases & Conditions", definition: "Câncer que afeta as células formadoras do sangue, geralmente na medula óssea." },
  { english: "Lipoma", spanish: "Lipoma", portuguese: "Lipoma", category: "Diseases & Conditions", definition: "Tumor benigno formado por células de gordura, geralmente localizado sob a pele." },
  { english: "Liver Disease", spanish: "Enfermedad hepática", portuguese: "Doença hepática", category: "Diseases & Conditions", definition: "Condição que compromete a estrutura ou o funcionamento do fígado." },
  { english: "Lung Cancer", spanish: "Cáncer de pulmón", portuguese: "Câncer de pulmão", category: "Diseases & Conditions", definition: "Câncer que se origina nos tecidos do pulmão." },
  { english: "Lupus", spanish: "Lupus", portuguese: "Lúpus", category: "Diseases & Conditions", definition: "Doença autoimune crônica que pode afetar diversos órgãos e tecidos." },
  { english: "Lyme disease", spanish: "Enfermedad de Lyme", portuguese: "Doença de Lyme", category: "Diseases & Conditions", definition: "Infecção bacteriana transmitida por carrapatos infectados." },
  { english: "Lymphoma", spanish: "Linfoma", portuguese: "Linfoma", category: "Diseases & Conditions", definition: "Câncer que se origina em células do sistema linfático." },
  { english: "Mad cow disease", spanish: "Enfermedad de las vacas locas", portuguese: "Doença da vaca louca", category: "Diseases & Conditions", definition: "Doença neurodegenerativa causada por príons, que afeta o gado." },
  { english: "Meningitis", spanish: "Meningitis", portuguese: "Meningite", category: "Diseases & Conditions", definition: "Inflamação das membranas que envolvem o cérebro e a medula espinhal." },
  { english: "Meningococcal Disease", spanish: "Enfermedad meningocócica", portuguese: "Doença meningocócica", category: "Diseases & Conditions", definition: "Infecção causada pela bactéria meningococo, que pode provocar meningite ou infecção generalizada." },
  { english: "Microcephaly", spanish: "Microcefalia", portuguese: "Microcefalia", category: "Diseases & Conditions", definition: "Condição em que a cabeça é menor do que o esperado para a idade." },
  { english: "Middle Ear Infection (otitis media)", spanish: "Infección del oído medio (otitis media)", portuguese: "Infecção do ouvido médio (otite média)", category: "Diseases & Conditions", definition: "Infecção e inflamação da cavidade do ouvido médio, geralmente associada a dor e, às vezes, febre." },
  { english: "Migraine headaches", spanish: "Migrañas", portuguese: "Enxaquecas", category: "Diseases & Conditions", definition: "Dores de cabeça recorrentes, muitas vezes intensas, que podem vir acompanhadas de náusea e sensibilidade à luz." },
  { english: "Mononucleosis", spanish: "Mononucleosis", portuguese: "Mononucleose", category: "Diseases & Conditions", definition: "Infecção geralmente causada pelo vírus Epstein-Barr, que pode provocar febre, dor de garganta e cansaço." },
  { english: "Multiple Sclerosis- MS", spanish: "Esclerosis múltiple (EM)", portuguese: "Esclerose múltipla (EM)", category: "Diseases & Conditions", definition: "Doença autoimune que afeta o sistema nervoso central e pode prejudicar a comunicação entre cérebro e corpo." },
  { english: "Mumps", spanish: "Paperas", portuguese: "Caxumba", category: "Diseases & Conditions", definition: "Infecção viral contagiosa que pode causar inchaço doloroso das glândulas salivares." },
  { english: "Muscular Atrophy", spanish: "Atrofia muscular", portuguese: "Atrofia muscular", category: "Diseases & Conditions", definition: "Redução do tamanho e da força dos músculos, que pode ocorrer por doença, lesão ou desuso." },
  { english: "Muscular Dystrophy", spanish: "Distrofia muscular", portuguese: "Distrofia muscular", category: "Diseases & Conditions", definition: "Grupo de doenças hereditárias que causam fraqueza e degeneração progressiva dos músculos." },
  { english: "Myiasis", spanish: "Miasis", portuguese: "Miíase", category: "Diseases & Conditions", definition: "Infestação de tecidos humanos por larvas de moscas." },
  { english: "Myocardial Infarction", spanish: "Infarto de miocardio", portuguese: "Infarto do miocárdio", category: "Diseases & Conditions", definition: "Lesão do músculo cardíaco causada pela interrupção do fluxo sanguíneo em uma artéria coronária." },
  { english: "Neuralgia", spanish: "Neuralgia", portuguese: "Neuralgia", category: "Diseases & Conditions", definition: "Dor que ocorre ao longo de um nervo ou em sua área de distribuição." },
  { english: "Neurocysticercosis", spanish: "Neurocisticercosis", portuguese: "Neurocisticercose", category: "Diseases & Conditions", definition: "Infecção do sistema nervoso central por larvas do parasita Taenia solium." },
  { english: "Neuropathy", spanish: "Neuropatía", portuguese: "Neuropatia", category: "Diseases & Conditions", definition: "Doença ou disfunção de um ou mais nervos, que pode causar dor, fraqueza ou alteração da sensibilidade." },
  { english: "Obesity", spanish: "Obesidad", portuguese: "Obesidade", category: "Diseases & Conditions", definition: "Condição caracterizada pelo excesso de gordura corporal, que pode afetar a saúde." },
  { english: "Osteoarthritis", spanish: "Osteoartritis", portuguese: "Osteoartrite", category: "Diseases & Conditions", definition: "Doença articular marcada pelo desgaste da cartilagem e por alterações nos ossos próximos." },
  { english: "Osteoporosis", spanish: "Osteoporosis", portuguese: "Osteoporose", category: "Diseases & Conditions", definition: "Doença que reduz a densidade e a resistência dos ossos, aumentando o risco de fraturas." },
  { english: "Pancreatitis", spanish: "Pancreatitis", portuguese: "Pancreatite", category: "Diseases & Conditions", definition: "Inflamação do pâncreas, que pode ser aguda ou crônica." },
  { english: "Parkinson Disease", spanish: "Enfermedad de Parkinson", portuguese: "Doença de Parkinson", category: "Diseases & Conditions", definition: "Doença neurológica progressiva que afeta o movimento e pode causar tremores, rigidez e lentidão." },
  { english: "Plague", spanish: "Peste", portuguese: "Peste", category: "Diseases & Conditions", definition: "Doença infecciosa causada pela bactéria Yersinia pestis, transmitida principalmente por pulgas infectadas." },
  { english: "Plantar Fasciitis", spanish: "Fascitis plantar", portuguese: "Fascite plantar", category: "Diseases & Conditions", definition: "Inflamação ou irritação da faixa de tecido que percorre a planta do pé." },
  { english: "Polio", spanish: "Poliomielitis", portuguese: "Poliomielite", category: "Diseases & Conditions", definition: "Doença viral que pode afetar o sistema nervoso e causar paralisia." },
  { english: "Post-Traumatic Stress Disorder (PTSD)", spanish: "Trastorno de estrés postraumático (TEPT)", portuguese: "Transtorno de estresse pós-traumático (TEPT)", category: "Diseases & Conditions", definition: "Transtorno que pode surgir após uma experiência traumática e causar lembranças intrusivas, evitação e estado de alerta elevado." },
  { english: "Pulmonary Embolism", spanish: "Embolia pulmonar", portuguese: "Embolia pulmonar", category: "Diseases & Conditions", definition: "Obstrução de uma artéria pulmonar, geralmente por um coágulo que se deslocou de outra parte do corpo." },
  { english: "Pulmonary Hypertension", spanish: "Hipertensión pulmonar", portuguese: "Hipertensão pulmonar", category: "Diseases & Conditions", definition: "Pressão elevada nas artérias que levam sangue do coração aos pulmões." },
  { english: "Rabies", spanish: "Rabia", portuguese: "Raiva", category: "Diseases & Conditions", definition: "Doença viral grave que afeta o sistema nervoso e é transmitida geralmente pela saliva de animais infectados." },
  { english: "Rheumatoid Arthritis", spanish: "Artritis reumatoide", portuguese: "Artrite reumatoide", category: "Diseases & Conditions", definition: "Doença autoimune que causa inflamação crônica das articulações." },
  { english: "Rotavirus", spanish: "Rotavirus", portuguese: "Rotavírus", category: "Diseases & Conditions", definition: "Vírus que pode causar gastroenterite, especialmente em crianças pequenas." },
  { english: "Salmonella", spanish: "Salmonella", portuguese: "Salmonella", category: "Diseases & Conditions", definition: "Gênero de bactérias que pode causar infecção intestinal transmitida por alimentos ou água contaminados." },
  { english: "Schizophrenia", spanish: "Esquizofrenia", portuguese: "Esquizofrenia", category: "Diseases & Conditions", definition: "Transtorno mental que pode afetar a percepção, o pensamento, as emoções e o comportamento." },
  { english: "Scoliosis", spanish: "Escoliosis", portuguese: "Escoliose", category: "Diseases & Conditions", definition: "Curvatura lateral anormal da coluna vertebral." },
  { english: "Seasonal allergies", spanish: "Alergias estacionales", portuguese: "Alergias sazonais", category: "Diseases & Conditions", definition: "Reações alérgicas desencadeadas por substâncias do ambiente que variam conforme a estação do ano." },
  { english: "Seizures /Convulsions", spanish: "Convulsiones", portuguese: "Convulsões", category: "Diseases & Conditions", definition: "Episódios de atividade elétrica cerebral anormal que podem causar movimentos involuntários ou alterações da consciência." },
  { english: "Sepsis", spanish: "Sepsis", portuguese: "Sepse", category: "Diseases & Conditions", definition: "Resposta desregulada do organismo a uma infecção, capaz de causar disfunção de órgãos." },
  { english: "Septic Shock", spanish: "Choque séptico", portuguese: "Choque séptico", category: "Diseases & Conditions", definition: "Forma grave de sepse que provoca alterações circulatórias e metabólicas com risco de vida." },
  { english: "Shingles", spanish: "Herpes zóster", portuguese: "Herpes-zóster", category: "Diseases & Conditions", definition: "Infecção viral que causa erupção dolorosa na pele e decorre da reativação do vírus da catapora." },
  { english: "Sickle Cell Disease", spanish: "Enfermedad de células falciformes", portuguese: "Doença falciforme", category: "Diseases & Conditions", definition: "Grupo de doenças hereditárias em que glóbulos vermelhos assumem formato de foice e podem obstruir vasos." },
  { english: "Sinus infection", spanish: "Infección de los senos paranasales", portuguese: "Infecção dos seios paranasais", category: "Diseases & Conditions", definition: "Infecção que afeta as cavidades ao redor do nariz, geralmente causando dor ou congestão." },
  { english: "Sinusitis", spanish: "Sinusitis", portuguese: "Sinusite", category: "Diseases & Conditions", definition: "Inflamação dos seios paranasais, que pode causar congestão, secreção nasal e dor facial." },
  { english: "Sleep Apnea", spanish: "Apnea del sueño", portuguese: "Apneia do sono", category: "Diseases & Conditions", definition: "Distúrbio em que a respiração para e recomeça repetidamente durante o sono." },
  { english: "Sleep Disorder", spanish: "Trastorno del sueño", portuguese: "Distúrbio do sono", category: "Diseases & Conditions", definition: "Condição que altera a qualidade, a duração ou o padrão do sono." },
  { english: "Sleepwalking", spanish: "Sonambulismo", portuguese: "Sonambulismo", category: "Diseases & Conditions", definition: "Comportamento de caminhar ou realizar atividades durante o sono, sem plena consciência." },
  { english: "Smallpox", spanish: "Viruela", portuguese: "Varíola", category: "Diseases & Conditions", definition: "Doença viral contagiosa, erradicada mundialmente, que causava febre e lesões na pele." },
  { english: "Spider veins", spanish: "Arañas vasculares", portuguese: "Telangiectasias", category: "Diseases & Conditions", definition: "Pequenos vasos sanguíneos dilatados, visíveis sob a pele, geralmente em forma de rede." },
  { english: "Strep throat infection", spanish: "Faringitis estreptocócica", portuguese: "Faringite estreptocócica", category: "Diseases & Conditions", definition: "Infecção da garganta causada por bactérias do grupo dos estreptococos." },
  { english: "Syphilis", spanish: "Sífilis", portuguese: "Sífilis", category: "Diseases & Conditions", definition: "Infecção sexualmente transmissível causada pela bactéria Treponema pallidum." },
  { english: "Tendonitis", spanish: "Tendinitis", portuguese: "Tendinite", category: "Diseases & Conditions", definition: "Inflamação ou irritação de um tendão, estrutura que liga músculos aos ossos." },
  { english: "Testicular cancer", spanish: "Cáncer testicular", portuguese: "Câncer de testículo", category: "Diseases & Conditions", definition: "Câncer que se origina nos tecidos de um ou ambos os testículos." },
  { english: "Tourette Syndrome", spanish: "Síndrome de Tourette", portuguese: "Síndrome de Tourette", category: "Diseases & Conditions", definition: "Distúrbio neurológico caracterizado por tiques motores e vocais recorrentes." },
  { english: "Toxoplasmosis", spanish: "Toxoplasmosis", portuguese: "Toxoplasmose", category: "Diseases & Conditions", definition: "Infecção causada pelo parasita Toxoplasma gondii." },
  { english: "Trauma", spanish: "Trauma", portuguese: "Trauma", category: "Diseases & Conditions", definition: "Lesão física ou sofrimento psicológico decorrente de um evento prejudicial." },
  { english: "Typhoid Fever", spanish: "Fiebre tifoidea", portuguese: "Febre tifoide", category: "Diseases & Conditions", definition: "Infecção bacteriana que pode causar febre prolongada e sintomas digestivos." },
  { english: "Ulcerative Colitis", spanish: "Colitis ulcerosa", portuguese: "Retocolite ulcerativa", category: "Diseases & Conditions", definition: "Doença inflamatória crônica que causa inflamação e feridas no revestimento do intestino grosso." },
  { english: "Vertigo", spanish: "Vértigo", portuguese: "Vertigem", category: "Diseases & Conditions", definition: "Sensação ilusória de movimento, como se a pessoa ou o ambiente estivesse girando." },
  { english: "Vitiligo", spanish: "Vitíligo", portuguese: "Vitiligo", category: "Diseases & Conditions", definition: "Condição em que áreas da pele perdem pigmentação e ficam mais claras." },
  { english: "Yellow Fever", spanish: "Fiebre amarilla", portuguese: "Febre amarela", category: "Diseases & Conditions", definition: "Doença viral transmitida por mosquitos, que pode causar febre e comprometimento de órgãos." },
  // Verbs — termos adicionados do MedicalGlossary.pdf
  { english: "Assist", spanish: "Ayudar", portuguese: "Ajudar", category: "Verbs", definition: "Prestar apoio ou auxílio a alguém." },
  { english: "Attend / Go to", spanish: "Asistir / acudir a", portuguese: "Comparecer / ir a", category: "Verbs", definition: "Estar presente ou deslocar-se a um local ou evento." },
  { english: "Auscultate", spanish: "Auscultar", portuguese: "Auscultar", category: "Verbs", definition: "Examinar sons internos do corpo, geralmente com um estetoscópio." },
  { english: "Bleed", spanish: "Sangrar", portuguese: "Sangrar", category: "Verbs", definition: "Perder sangue por uma lesão ou por outra causa." },
  { english: "Blow the nose", spanish: "Sonarse la nariz", portuguese: "Assoar o nariz", category: "Verbs", definition: "Expelir secreções nasais soprando pelo nariz." },
  { english: "Bottle Feed", spanish: "Alimentar con biberón", portuguese: "Alimentar com mamadeira", category: "Verbs", definition: "Dar leite ou fórmula a um bebê usando uma mamadeira." },
  { english: "Breastfeed", spanish: "Amamantar", portuguese: "Amamentar", category: "Verbs", definition: "Alimentar um bebê com leite materno diretamente da mama." },
  { english: "Call in the prescription", spanish: "Solicitar la receta por teléfono", portuguese: "Solicitar a receita por telefone", category: "Verbs", definition: "Pedir que uma receita médica seja enviada ou autorizada por telefone." },
  { english: "Calm down", spanish: "Calmarse", portuguese: "Acalmar-se", category: "Verbs", definition: "Tornar-se menos agitado ou ansioso." },
  { english: "Chew", spanish: "Masticar", portuguese: "Mastigar", category: "Verbs", definition: "Triturara alimentos com os dentes antes de engolir." },
  { english: "Conduct", spanish: "Realizar", portuguese: "Realizar", category: "Verbs", definition: "Executar uma atividade, procedimento ou exame." },
  { english: "Crawl", spanish: "Gatear", portuguese: "Engatinhar", category: "Verbs", definition: "Deslocar-se apoiando-se nas mãos e nos joelhos." },
  { english: "Deliver", spanish: "Dar a luz", portuguese: "Dar à luz", category: "Verbs", definition: "Ter um bebê ao final da gestação." },
  { english: "Disinfect", spanish: "Desinfectar", portuguese: "Desinfetar", category: "Verbs", definition: "Eliminar ou reduzir microrganismos em superfícies ou objetos." },
  { english: "Diagnose", spanish: "Diagnosticar", portuguese: "Diagnosticar", category: "Verbs", definition: "Identificar uma doença ou condição com base em informações clínicas." },
  { english: "Dislocate / Dislodge", spanish: "Dislocar / desprender", portuguese: "Deslocar / desprender", category: "Verbs", definition: "Tirar uma estrutura de sua posição ou fazer com que se solte." },
  { english: "Do surgery", spanish: "Operar", portuguese: "Fazer uma cirurgia", category: "Verbs", definition: "Realizar um procedimento cirúrgico em uma pessoa." },
  { english: "Examine", spanish: "Examinar", portuguese: "Examinar", category: "Verbs", definition: "Avaliar uma pessoa ou parte do corpo para obter informações clínicas." },
  { english: "Exhale", spanish: "Exhalar", portuguese: "Expirar", category: "Verbs", definition: "Liberar o ar dos pulmões." },
  { english: "Ejaculate", spanish: "Eyacular", portuguese: "Ejacular", category: "Verbs", definition: "Expulsar sêmen pelo pênis, geralmente durante o orgasmo." },
  { english: "Faint/ Pass out", spanish: "Desmayarse", portuguese: "Desmaiar", category: "Verbs", definition: "Perder a consciência temporariamente." },
  { english: "Fill medications", spanish: "Dispensar medicamentos", portuguese: "Dispensar medicamentos", category: "Verbs", definition: "Separar e fornecer os medicamentos prescritos a uma pessoa." },
  { english: "Frigidity", spanish: "Frigidez", portuguese: "Frigidez", category: "Symptoms & Conditions", definition: "Termo antigo e atualmente desaconselhado para diminuição do desejo ou da resposta sexual." },
  { english: "Frown", spanish: "Fruncir el ceño", portuguese: "Franzir a testa", category: "Verbs", definition: "Contrair as sobrancelhas, geralmente como expressão de preocupação ou desagrado." },
  { english: "Gasp", spanish: "Jadear", portuguese: "Arfar", category: "Verbs", definition: "Respirar de modo rápido e difícil, muitas vezes com a boca aberta." },
  { english: "Get admitted", spanish: "Ser hospitalizado", portuguese: "Ser internado", category: "Verbs", definition: "Ser admitido em um hospital para receber cuidados." },
  { english: "Get worse/ Worsen", spanish: "Empeorar", portuguese: "Piorar", category: "Verbs", definition: "Tornar-se mais grave ou apresentar agravamento." },
  { english: "Give a shot/ an injection", spanish: "Administrar una inyección", portuguese: "Aplicar uma injeção", category: "Verbs", definition: "Introduzir um medicamento no corpo por meio de uma agulha." },
  { english: "Hit / strike (with/ against)", spanish: "Golpear / chocar (contra)", portuguese: "Bater / atingir (com ou contra)", category: "Verbs", definition: "Entrar em contato com força contra algo ou alguém." },
  { english: "Hold", spanish: "Sostener", portuguese: "Segurar", category: "Verbs", definition: "Manter algo firme com as mãos ou em determinada posição." },
  { english: "Hold on (the line)", spanish: "Esperar en la línea", portuguese: "Aguardar na linha", category: "Verbs", definition: "Permanecer na chamada telefônica enquanto se espera atendimento." },
  { english: "Increase", spanish: "Aumentar", portuguese: "Aumentar", category: "Verbs", definition: "Tornar maior em quantidade, intensidade ou dimensão." },
  { english: "Inhale", spanish: "Inhalar", portuguese: "Inspirar", category: "Verbs", definition: "Levar o ar para dentro dos pulmões." },
  { english: "Inject", spanish: "Inyectar", portuguese: "Injetar", category: "Verbs", definition: "Introduzir uma substância no corpo com uma seringa ou dispositivo." },
  { english: "Keep down / tolerate", spanish: "Retener / tolerar", portuguese: "Manter no estômago / tolerar", category: "Verbs", definition: "Conseguir manter alimentos ou líquidos no estômago sem vomitar." },
  { english: "Kneel", spanish: "Arrodillarse", portuguese: "Ajoelhar-se", category: "Verbs", definition: "Apoiar um ou ambos os joelhos no chão." },
  { english: "Latch on", spanish: "Prenderse", portuguese: "Pegar-se", category: "Verbs", definition: "Aderir ou prender-se a algo; na amamentação, iniciar a sucção no peito." },
  { english: "Lie down", spanish: "Acostarse", portuguese: "Deitar", category: "Verbs", definition: "Colocar o corpo em posição horizontal ou repousar sobre uma superfície." },
  { english: "Lie on your back / Lie back", spanish: "Acostarse boca arriba / reclinarse", portuguese: "Deitar-se de costas / reclinar-se", category: "Verbs", definition: "Assumir posição deitado com o rosto voltado para cima ou inclinar o tronco para trás." },
  { english: "Lift", spanish: "Levantar", portuguese: "Levantar", category: "Verbs", definition: "Erguer ou elevar algo ou alguém." },
  { english: "Limp", spanish: "Cojear", portuguese: "Mancar", category: "Verbs", definition: "Caminhar com dificuldade ou de modo irregular, geralmente por dor ou lesão." },
  { english: "Lose Balance", spanish: "Perder el equilibrio", portuguese: "Perder o equilíbrio", category: "Verbs", definition: "Ficar instável ou deixar de manter a postura corporal." },
  { english: "Lose Consciousness", spanish: "Perder el conocimiento", portuguese: "Perder a consciência", category: "Verbs", definition: "Deixar de estar consciente ou responsivo ao ambiente." },
  { english: "Lower/ Decrease", spanish: "Reducir / disminuir", portuguese: "Reduzir / diminuir", category: "Verbs", definition: "Tornar menor em quantidade, intensidade ou valor." },
  { english: "Make a fist", spanish: "Cerrar el puño", portuguese: "Fechar a mão em punho", category: "Verbs", definition: "Dobrar os dedos contra a palma da mão, formando um punho." },
  { english: "Masturbate", spanish: "Masturbarse", portuguese: "Masturbar-se", category: "Verbs", definition: "Estimular os próprios órgãos genitais para obter prazer sexual." },
  { english: "Miss a dose", spanish: "Omitir una dosis", portuguese: "Deixar de tomar uma dose", category: "Verbs", definition: "Não tomar uma dose de medicamento no horário previsto." },
  { english: "Mix / steer", spanish: "Mezclar / dirigir", portuguese: "Misturar / dirigir", category: "Verbs", definition: "Combinar substâncias ou conduzir um veículo, conforme o contexto." },
  { english: "Move backwards/ back up", spanish: "Retroceder / dar marcha atrás", portuguese: "Mover-se para trás / recuar", category: "Verbs", definition: "Deslocar-se no sentido oposto ao avanço." },
  { english: "Move forward", spanish: "Avanzar", portuguese: "Mover-se para a frente", category: "Verbs", definition: "Deslocar-se na direção dianteira." },
  { english: "Move the bowels / defecate", spanish: "Defecar", portuguese: "Evacuar / defecar", category: "Verbs", definition: "Eliminar as fezes pelo reto." },
  { english: "Prick/ Poke", spanish: "Pinchar / picar", portuguese: "Picar / cutucar", category: "Verbs", definition: "Tocar ou perfurar algo com uma ponta ou objeto fino." },
  { english: "Overeat", spanish: "Comer en exceso", portuguese: "Comer em excesso", category: "Verbs", definition: "Consumir uma quantidade de alimentos maior que o habitual ou necessário." },
  { english: "Overexert", spanish: "Esforzarse demasiado", portuguese: "Fazer esforço excessivo", category: "Verbs", definition: "Exercer esforço físico além do que o corpo tolera confortavelmente." },
  { english: "Page a doctor", spanish: "Llamar a un médico por localizador", portuguese: "Chamar um médico pelo pager", category: "Verbs", definition: "Enviar uma chamada ou mensagem a um médico por meio de um pager." },
  { english: "Pass away/ die", spanish: "Fallecer / morir", portuguese: "Falecer / morrer", category: "Verbs", definition: "Deixar de viver; falecer é uma forma mais respeitosa de expressar essa ocorrência." },
  { english: "Point out", spanish: "Señalar", portuguese: "Apontar / destacar", category: "Verbs", definition: "Indicar ou chamar a atenção para algo ou alguém." },
  { english: "Pour", spanish: "Verter", portuguese: "Despejar", category: "Verbs", definition: "Fazer um líquido escorrer de um recipiente para outro local." },
  { english: "Print out", spanish: "Imprimir", portuguese: "Imprimir", category: "Verbs", definition: "Produzir uma cópia física de um documento ou imagem." },
  { english: "Punch", spanish: "Golpear con el puño", portuguese: "Socar", category: "Verbs", definition: "Golpear alguém ou algo com o punho fechado." },
  { english: "Refill", spanish: "Reponer", portuguese: "Reabastecer / renovar", category: "Verbs", definition: "Fornecer novamente uma quantidade consumida, como medicamento ou suprimento." },
  // Acronyms — termos adicionados do MedicalGlossary.pdf
  { english: "A1C Test", spanish: "Prueba de A1C", portuguese: "Exame de A1C (hemoglobina glicada)", category: "Acronyms", definition: "Exame que mede a proporção de hemoglobina ligada à glicose e estima a glicemia média recente." },
  { english: "ADD", spanish: "Trastorno por déficit de atención", portuguese: "Transtorno de déficit de atenção (ADD)", category: "Acronyms", definition: "Sigla inglesa para transtorno de déficit de atenção, condição que pode afetar atenção e organização." },
  { english: "ADHD", spanish: "Trastorno por déficit de atención e hiperactividad", portuguese: "Transtorno de déficit de atenção e hiperatividade (ADHD)", category: "Acronyms", definition: "Sigla inglesa para transtorno que pode envolver desatenção, hiperatividade e impulsividade." },
  { english: "CMV", spanish: "Citomegalovirus (CMV)", portuguese: "Citomegalovírus (CMV)", category: "Acronyms", definition: "Vírus da família dos herpesvírus que pode causar infecção em pessoas de qualquer idade." },
  { english: "COPD", spanish: "Enfermedad pulmonar obstructiva crónica (EPOC)", portuguese: "Doença pulmonar obstrutiva crônica (DPOC)", category: "Acronyms", definition: "Sigla inglesa para doença pulmonar que obstrui persistentemente o fluxo de ar." },
  { english: "CPAP", spanish: "CPAP (presión positiva continua en las vías respiratorias)", portuguese: "CPAP (pressão positiva contínua nas vias aéreas)", category: "Acronyms", definition: "Sigla de pressão positiva contínua nas vias aéreas, método de suporte respiratório que mantém as vias aéreas abertas." },
  { english: "D&C", spanish: "D&C (dilatación y curetaje)", portuguese: "D&C (dilatação e curetagem)", category: "Acronyms", definition: "Procedimento que dilata o colo do útero e remove tecido do interior do útero." },
  { english: "DNI", spanish: "DNI (no intubar)", portuguese: "DNI (não intubar)", category: "Acronyms", definition: "Ordem médica que registra a decisão de não realizar intubação endotraqueal." },
  { english: "DNR", spanish: "DNR (no reanimar)", portuguese: "DNR (não reanimar)", category: "Acronyms", definition: "Ordem médica que registra a decisão de não realizar manobras de reanimação cardiopulmonar." },
  { english: "DPT/Tdap", spanish: "Vacunas contra la difteria, el tétanos y la tosferina (DTP/dTpa)", portuguese: "Vacinas contra difteria, tétano e coqueluche (DTP/dTpa)", category: "Acronyms", definition: "Siglas de vacinas que protegem contra difteria, coqueluche e tétano, com formulações diferentes." },
  { english: "DVT", spanish: "TVP (trombosis venosa profunda)", portuguese: "TVP (trombose venosa profunda)", category: "Acronyms", definition: "Formação de um coágulo em uma veia localizada profundamente, geralmente nas pernas." },
  { english: "EBT card", spanish: "tarjeta EBT", portuguese: "cartão EBT", category: "Acronyms", definition: "Cartão usado nos Estados Unidos para acessar benefícios eletrônicos de assistência alimentar ou social." },
  { english: "ECHO", spanish: "ECHO (ecocardiograma)", portuguese: "ECHO (ecocardiograma)", category: "Acronyms", definition: "Exame de ultrassom que mostra imagens do coração e avalia sua estrutura e funcionamento." },
  { english: "EEG", spanish: "EEG (electroencefalograma)", portuguese: "EEG (eletroencefalograma)", category: "Acronyms", definition: "Exame que registra a atividade elétrica do cérebro por meio de eletrodos no couro cabeludo." },
  { english: "EGD", spanish: "EGD (endoscopia digestiva alta)", portuguese: "EGD (endoscopia digestiva alta)", category: "Acronyms", definition: "Exame que permite visualizar o esôfago, o estômago e o início do intestino delgado." },
  { english: "GERD", spanish: "ERGE (enfermedad por reflujo gastroesofágico)", portuguese: "DRGE (doença do refluxo gastroesofágico)", category: "Acronyms", definition: "Condição em que o conteúdo do estômago retorna frequentemente ao esôfago e pode causar sintomas." },
  { english: "HIV", spanish: "VIH (virus de la inmunodeficiencia humana)", portuguese: "HIV (vírus da imunodeficiência humana)", category: "Acronyms", definition: "Vírus que ataca células do sistema imunológico e pode levar à síndrome da imunodeficiência adquirida." },
  { english: "HMO", spanish: "HMO (organización para el mantenimiento de la salud)", portuguese: "HMO (organização para manutenção da saúde)", category: "Acronyms", definition: "Tipo de plano de saúde que oferece atendimento por uma rede de profissionais e serviços credenciados." },
  { english: "HPV", spanish: "VPH (virus del papiloma humano)", portuguese: "HPV (papilomavírus humano)", category: "Acronyms", definition: "Grupo de vírus que pode infectar a pele e as mucosas, causando verrugas ou alterações celulares." },
  { english: "IEP", spanish: "IEP (programa educativo individualizado)", portuguese: "IEP (programa educacional individualizado)", category: "Acronyms", definition: "Plano que descreve serviços e adaptações educacionais para atender às necessidades de um estudante." },
  { english: "INR", spanish: "INR (índice internacional normalizado)", portuguese: "INR (razão normalizada internacional)", category: "Acronyms", definition: "Medida laboratorial padronizada do tempo de coagulação do sangue, usada para monitorar anticoagulantes." },
  { english: "IUD", spanish: "DIU (dispositivo intrauterino)", portuguese: "DIU (dispositivo intrauterino)", category: "Acronyms", definition: "Dispositivo colocado no útero para prevenir a gravidez." },
  { english: "MMR", spanish: "Vacuna triple viral (contra sarampión, paperas y rubéola)", portuguese: "vacina tríplice viral (contra sarampo, caxumba e rubéola)", category: "Acronyms", definition: "Sigla inglesa da vacina que protege contra sarampo, caxumba e rubéola." },
  { english: "MRN", spanish: "MRN (número de historia clínica)", portuguese: "MRN (número de prontuário)", category: "Acronyms", definition: "Número de identificação atribuído ao registro médico de uma pessoa em um serviço de saúde." },
  { english: "MRSA", spanish: "MRSA (Staphylococcus aureus resistente a la meticilina)", portuguese: "MRSA (Staphylococcus aureus resistente à meticilina)", category: "Acronyms", definition: "Tipo de bactéria Staphylococcus aureus resistente a vários antibióticos, incluindo a meticilina." },
  { english: "NICU", spanish: "UCIN (unidad de cuidados intensivos neonatales)", portuguese: "UTIN (unidade de terapia intensiva neonatal)", category: "Acronyms", definition: "Unidade hospitalar especializada no cuidado intensivo de recém-nascidos gravemente doentes ou prematuros." },
  { english: "NP", spanish: "NP (enfermero practicante)", portuguese: "NP (enfermeiro de prática avançada)", category: "Acronyms", definition: "Profissional de enfermagem com formação avançada, autorizado a prestar determinados cuidados clínicos." },
  { english: "OT/PT", spanish: "Terapia ocupacional y fisioterapia", portuguese: "Terapia ocupacional e fisioterapia", category: "Acronyms", definition: "Siglas inglesas para terapia ocupacional e fisioterapia, áreas que apoiam a função e a mobilidade." },
  { english: "PET Scan", spanish: "PET Scan (tomografía por emisión de positrones)", portuguese: "PET Scan (tomografia por emissão de pósitrons)", category: "Acronyms", definition: "Exame de imagem que detecta a distribuição de uma substância radioativa no organismo." },
  { english: "PICC", spanish: "PICC (catéter central de inserción periférica)", portuguese: "PICC (cateter central de inserção periférica)", category: "Acronyms", definition: "Cateter longo inserido por uma veia periférica e cuja ponta chega a uma veia central." },
  { english: "PKU", spanish: "PKU (fenilcetonuria)", portuguese: "PKU (fenilcetonúria)", category: "Acronyms", definition: "Doença hereditária que dificulta a metabolização do aminoácido fenilalanina." },
  { english: "PMS", spanish: "PMS (síndrome premenstrual)", portuguese: "PMS (síndrome pré-menstrual)", category: "Acronyms", definition: "Conjunto de sintomas físicos e emocionais que pode ocorrer antes da menstruação." },
  { english: "PPO", spanish: "PPO (organización de proveedores preferidos)", portuguese: "PPO (organização de prestadores preferenciais)", category: "Acronyms", definition: "Tipo de plano de saúde que oferece uma rede de prestadores e permite atendimento fora dela." },
  { english: "PTSD", spanish: "TEPT (trastorno de estrés postraumático)", portuguese: "TEPT (transtorno de estresse pós-traumático)", category: "Acronyms", definition: "Transtorno que pode surgir após exposição a evento traumático e causar sintomas persistentes." },
  { english: "RN", spanish: "RN (enfermero registrado)", portuguese: "RN (enfermeiro registrado)", category: "Acronyms", definition: "Sigla inglesa para enfermeiro com registro profissional e qualificação reconhecida." },
  { english: "SIDS", spanish: "SIDS (síndrome de muerte súbita del lactante)", portuguese: "SIDS (síndrome da morte súbita do lactente)", category: "Acronyms", definition: "Síndrome caracterizada pela morte súbita e inesperada de um bebê com menos de um ano, sem causa identificada." },
  { english: "STD", spanish: "STD (enfermedad de transmisión sexual)", portuguese: "STD (doença sexualmente transmissível)", category: "Acronyms", definition: "Doença causada por agentes infecciosos transmitidos principalmente por contato sexual." },
  { english: "TMJ", spanish: "ATM (articulación temporomandibular)", portuguese: "ATM (articulação temporomandibular)", category: "Acronyms", definition: "Articulação que conecta a mandíbula ao crânio e permite os movimentos da boca." },
  { english: "UTI", spanish: "IVU (infección del tracto urinario)", portuguese: "ITU (infecção do trato urinário)", category: "Acronyms", definition: "Infecção que afeta estruturas do sistema urinário, como bexiga, uretra ou rins." },
];

const STUDY_CATEGORIES_STORAGE_KEY = 'medflash.studyCategories.v1';
const STUDY_DIRECTION_STORAGE_KEY = 'medflash.studyDirection.v1';
const USER_RATINGS_STORAGE_KEY = 'medflash.userRatings.v1';
const QUIZ_ERROR_COUNTS_STORAGE_KEY = 'medflash.quizErrorCounts.v1';

function readStoredObject(key) {
  try {
    if (typeof window === 'undefined') return {};
    const value = JSON.parse(window.localStorage.getItem(key) || '{}');
    return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
  } catch {
    return {};
  }
}

function readStoredStringArray(key) {
  try {
    if (typeof window === 'undefined') return [];
    const value = JSON.parse(window.localStorage.getItem(key) || '[]');
    return Array.isArray(value) ? value.filter(item => typeof item === 'string') : [];
  } catch {
    return [];
  }
}

function readStudyCategories() {
  try {
    if (typeof window !== 'undefined' && window.localStorage.getItem(STUDY_CATEGORIES_STORAGE_KEY) !== null) {
      return readStoredStringArray(STUDY_CATEGORIES_STORAGE_KEY);
    }
  } catch {}
  return GLOSSARY_DATA[0]?.category ? [GLOSSARY_DATA[0].category] : [];
}

function resolveStudyDirection(mode) {
  if (mode === 'random') return Math.random() < 0.5 ? 'en-to-target' : 'target-to-en';
  return mode === 'target-to-en' ? 'target-to-en' : 'en-to-target';
}

function useStudyDirection(item, languagePair, directionMode) {
  return useMemo(
    () => resolveStudyDirection(directionMode),
    [item?.english, languagePair, directionMode]
  );
}

function shuffleItems(items) {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function termSimilarity(left, right) {
  const normalize = value => String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
  const a = normalize(left);
  const b = normalize(right);
  if (!a || !b) return 0;
  if (a === b) return 1;
  const previous = Array.from({ length: b.length + 1 }, (_, index) => index);
  for (let i = 1; i <= a.length; i += 1) {
    let diagonal = previous[0];
    previous[0] = i;
    for (let j = 1; j <= b.length; j += 1) {
      const above = previous[j];
      previous[j] = Math.min(previous[j] + 1, previous[j - 1] + 1, diagonal + (a[i - 1] === b[j - 1] ? 0 : 1));
      diagonal = above;
    }
  }
  const editSimilarity = 1 - previous[b.length] / Math.max(a.length, b.length);
  const aTokens = new Set(a.split(/\s+/));
  const bTokens = new Set(b.split(/\s+/));
  const overlap = [...aTokens].filter(token => bTokens.has(token)).length;
  const tokenSimilarity = (2 * overlap) / (aTokens.size + bTokens.size);
  return Math.max(editSimilarity, tokenSimilarity);
}

const uiText = (languagePair, portuguese, spanish) => languagePair === 'en-es' ? spanish : portuguese;

const CATEGORY_LABELS_ES = {
  'Body Parts': 'Partes del cuerpo',
  'Brain & Nervous System': 'Cerebro y sistema nervioso',
  'Cardiovascular System': 'Sistema cardiovascular',
  'Skeletal System': 'Sistema esquelético',
  'Symptoms & Conditions': 'Síntomas y afecciones',
  'Types of Pain': 'Tipos de dolor',
  'Medical Supplies': 'Material médico',
  'Diseases & Conditions': 'Enfermedades y afecciones',
  'Acronyms': 'Siglas',
  'Lymphatic System': 'Sistema linfático',
  'Male Reproductive System': 'Sistema reproductor masculino',
  'Female Reproductive System': 'Sistema reproductor femenino',
  'Digestive System': 'Sistema digestivo',
  'Head & Respiratory System': 'Cabeza y sistema respiratorio',
  'Endocrine System': 'Sistema endocrino',
  'Hormones & Neurotransmitters': 'Hormonas y neurotransmisores',
  'Specialties & Facilities': 'Especialidades e instalaciones',
  'Medical Professions': 'Profesiones médicas',
  'Ophthalmology': 'Oftalmología',
  'Dermatology': 'Dermatología',
  'Dental': 'Odontología',
  'Genetics': 'Genética',
  'OBGYN': 'Obstetricia y ginecología',
  'Tests & Procedures': 'Pruebas y procedimientos',
  'Types of Medications': 'Tipos de medicamentos',
  'Verbs': 'Verbos',
};
const categoryLabel = (category, languagePair) => languagePair === 'en-es' ? (CATEGORY_LABELS_ES[category] || category) : category;

export default function MedicalGlossaryApp() {
  // State management
  const [languagePair, setLanguagePair] = useState('en-pt'); // 'en-es' or 'en-pt'
  const [activeTab, setActiveTab] = useState('flashcards'); // 'flashcards', 'quiz', 'spelling', 'glossary'
  const [selectedStudyCategories, setSelectedStudyCategories] = useState(readStudyCategories);
  const [directionMode, setDirectionMode] = useState(() => {
    try {
      const saved = window.localStorage.getItem(STUDY_DIRECTION_STORAGE_KEY);
      return ['en-to-target', 'target-to-en', 'random'].includes(saved) ? saved : 'en-to-target';
    } catch { return 'en-to-target'; }
  });
  const [difficultyFilter, setDifficultyFilter] = useState('all'); // 'all', 'easy', 'medium', 'hard'
  const [searchTerm, setSearchTerm] = useState('');

  // Keep manual ratings and automatic quiz difficulty marks between visits.
  const [userRatings, setUserRatings] = useState(() => readStoredObject(USER_RATINGS_STORAGE_KEY));
  const [quizErrorCounts, setQuizErrorCounts] = useState(() => readStoredObject(QUIZ_ERROR_COUNTS_STORAGE_KEY));

  useEffect(() => {
    try { window.localStorage.setItem(USER_RATINGS_STORAGE_KEY, JSON.stringify(userRatings)); } catch {}
  }, [userRatings]);
  useEffect(() => {
    try { window.localStorage.setItem(QUIZ_ERROR_COUNTS_STORAGE_KEY, JSON.stringify(quizErrorCounts)); } catch {}
  }, [quizErrorCounts]);

  // Speech synthesis
  const [isSpeaking, setIsSpeaking] = useState(false);

  // One category checklist scopes every study mode and the glossary table.
  const categories = useMemo(
    () => [...new Set(GLOSSARY_DATA.map(item => item.category))].sort((a, b) => a.localeCompare(b, 'pt-BR')),
    []
  );
  const studyCategoryItems = useMemo(
    () => GLOSSARY_DATA.filter(item => selectedStudyCategories.includes(item.category)),
    [selectedStudyCategories]
  );

  useEffect(() => {
    try { window.localStorage.setItem(STUDY_CATEGORIES_STORAGE_KEY, JSON.stringify(selectedStudyCategories)); } catch {}
  }, [selectedStudyCategories]);
  useEffect(() => {
    try { window.localStorage.setItem(STUDY_DIRECTION_STORAGE_KEY, directionMode); } catch {}
  }, [directionMode]);

  const baseFilteredList = useMemo(() => {
    return GLOSSARY_DATA.filter(item => {
      const matchCat = selectedStudyCategories.includes(item.category);
      const rating = userRatings[item.english];
      const matchDiff = difficultyFilter === 'all' ||
                        (difficultyFilter === 'hard' && rating === 'hard') ||
                        (difficultyFilter === 'medium' && rating === 'medium') ||
                        (difficultyFilter === 'easy' && rating === 'easy');
      const matchSearch = item.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.spanish.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.portuguese.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.definition.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchDiff && matchSearch;
    });
  }, [selectedStudyCategories, difficultyFilter, searchTerm, userRatings]);

  // Handle TTS text to speech
  const speakText = (text, lang) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel(); // Stop current playing speech
    
    const utterance = new SpeechSynthesisUtterance(text);
    if (lang === 'en') utterance.lang = 'en-US';
    else if (lang === 'es') utterance.lang = 'es-ES';
    else if (lang === 'pt') utterance.lang = 'pt-BR';

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleSetRating = (termEnglish, rating) => {
    setUserRatings(prev => ({
      ...prev,
      [termEnglish]: rating
    }));
  };

  const handleRecordQuizMistake = (termEnglish) => {
    const nextCount = (Number(quizErrorCounts[termEnglish]) || 0) + 1;
    setQuizErrorCounts(prev => ({ ...prev, [termEnglish]: (Number(prev[termEnglish]) || 0) + 1 }));
    if (nextCount >= 2) {
      setUserRatings(ratings => ({ ...ratings, [termEnglish]: 'hard' }));
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* Top Navigation Bar */}
      <header className="bg-slate-800/90 backdrop-blur border-b border-slate-700/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-tr from-blue-600 to-cyan-500 p-2.5 rounded-xl shadow-lg shadow-blue-500/20">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                MedFlash <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">PRO</span>
              </h1>
              <p className="text-xs text-slate-400 hidden sm:block">{uiText(languagePair, 'Glossário & Exercícios de Memorização Médica', 'Glosario y ejercicios de memorización médica')}</p>
            </div>
          </div>

          {/* Language Pair Switcher */}
          <div className="flex items-center space-x-2 bg-slate-900/80 p-1 rounded-lg border border-slate-700">
            <button
              onClick={() => setLanguagePair('en-pt')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                languagePair === 'en-pt'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              🇺🇸 EN ➔ 🇧🇷 PT
            </button>
            <button
              onClick={() => setLanguagePair('en-es')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                languagePair === 'en-es'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              🇺🇸 EN ➔ 🇪🇸 ES
            </button>
          </div>
        </div>
      </header>

      {/* Primary Navigation Tabs */}
      <nav className="bg-slate-800/50 border-b border-slate-700/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-1 sm:space-x-4 overflow-x-auto no-scrollbar py-2">
          <button
            onClick={() => setActiveTab('flashcards')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'flashcards'
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{uiText(languagePair, 'Flashcards 3D', 'Tarjetas 3D')}</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'quiz'
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>{uiText(languagePair, 'Quiz Múltipla Escolha', 'Cuestionario de opción múltiple')}</span>
          </button>

          <button
            onClick={() => setActiveTab('spelling')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'spelling'
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
            }`}
          >
            <Edit3 className="w-4 h-4" />
            <span>{uiText(languagePair, 'Treino de Escrita', 'Práctica de escritura')}</span>
          </button>

          <button
            onClick={() => setActiveTab('glossary')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'glossary'
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{uiText(languagePair, 'Glossário Completo', 'Glosario completo')}</span>
          </button>
        </div>
      </nav>

      <StudySettingsPanel
        items={GLOSSARY_DATA}
        categories={categories}
        selectedCategories={selectedStudyCategories}
        onToggleCategory={(category) => setSelectedStudyCategories(prev => prev.includes(category) ? prev.filter(value => value !== category) : [...prev, category])}
        onSelectAllCategories={() => setSelectedStudyCategories(categories)}
        onClearCategories={() => setSelectedStudyCategories([])}
        selectedWordCount={studyCategoryItems.length}
        languagePair={languagePair}
        directionMode={directionMode}
        onDirectionChange={setDirectionMode}
      />

      {/* Quick filters apply to all modes; study categories and direction are configured above. */}
      <div className="bg-slate-900 border-b border-slate-800 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Difficulty Quick Filter */}
          <div className="flex items-center space-x-1 bg-slate-800/80 p-1 rounded-lg border border-slate-700/80 w-full sm:w-auto justify-center">
            <button
              onClick={() => setDifficultyFilter('all')}
              className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                difficultyFilter === 'all' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {uiText(languagePair, 'Todos', 'Todas')} ({studyCategoryItems.length})
            </button>
            <button
              onClick={() => setDifficultyFilter('hard')}
              className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                difficultyFilter === 'hard' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'text-slate-400 hover:text-rose-400'
              }`}
            >
              🔴 {uiText(languagePair, 'Difíceis', 'Difíciles')} ({studyCategoryItems.filter(item => userRatings[item.english] === 'hard').length})
            </button>
            <button
              onClick={() => setDifficultyFilter('medium')}
              className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                difficultyFilter === 'medium' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-slate-400 hover:text-amber-400'
              }`}
            >
              🟡 {uiText(languagePair, 'Médias', 'Intermedias')} ({studyCategoryItems.filter(item => userRatings[item.english] === 'medium').length})
            </button>
            <button
              onClick={() => setDifficultyFilter('easy')}
              className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                difficultyFilter === 'easy' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'text-slate-400 hover:text-emerald-400'
              }`}
            >
              🟢 {uiText(languagePair, 'Fáceis', 'Fáciles')} ({studyCategoryItems.filter(item => userRatings[item.english] === 'easy').length})
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder={uiText(languagePair, 'Buscar termo ou significado...', 'Buscar término o significado...')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-slate-200 text-xs sm:text-sm rounded-lg pl-9 pr-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
            />
          </div>
        </div>
      </div>

      {/* Main Content Render Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {baseFilteredList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="bg-slate-800 p-4 rounded-full text-slate-500 mb-4">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold text-slate-300">{uiText(languagePair, 'Nenhum termo encontrado', 'No se encontraron términos')}</h3>
            <p className="text-sm text-slate-500 max-w-md mt-1">
              {uiText(languagePair, 'Tente redefinir os filtros de busca, categoria ou marcação de dificuldade para ver mais palavras.', 'Prueba a cambiar la búsqueda, la categoría o el nivel de dificultad para ver más palabras.')}
            </p>
            <button
              onClick={() => {
                setSelectedStudyCategories(categories);
                setDifficultyFilter('all');
                setSearchTerm('');
              }}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-500 transition-colors"
            >
              {uiText(languagePair, 'Limpar Filtros', 'Limpiar filtros')}
            </button>
          </div>
        ) : (
          <>
            {activeTab === 'flashcards' && (
              <FlashcardsView
                items={baseFilteredList}
                languagePair={languagePair}
                directionMode={directionMode}
                speakText={speakText}
                userRatings={userRatings}
                onSetRating={handleSetRating}
              />
            )}

            {activeTab === 'quiz' && (
              <QuizView
                items={baseFilteredList}
                languagePair={languagePair}
                directionMode={directionMode}
                speakText={speakText}
                userRatings={userRatings}
                onRecordMistake={handleRecordQuizMistake}
              />
            )}

            {activeTab === 'spelling' && (
              <SpellingView
                items={baseFilteredList}
                languagePair={languagePair}
                directionMode={directionMode}
                speakText={speakText}
                onRecordMistake={handleRecordQuizMistake}
              />
            )}

            {activeTab === 'glossary' && (
              <GlossaryTableView
                items={baseFilteredList}
                languagePair={languagePair}
                speakText={speakText}
                userRatings={userRatings}
                onSetRating={handleSetRating}
              />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 text-slate-500 text-xs py-4 text-center">
        <p>
          MedFlash © {uiText(languagePair, 'Glossário Médico Completo • Ferramenta Interativa para Estudo de Tradução e Interpretação', 'Glosario médico completo • Herramienta interactiva para estudiar traducción e interpretación')}
        </p>
      </footer>
    </div>
  );
}

function StudySettingsPanel({ items, categories, selectedCategories, onToggleCategory, onSelectAllCategories, onClearCategories, selectedWordCount, languagePair, directionMode, onDirectionChange }) {
  const targetLanguage = languagePair === 'en-pt' ? uiText(languagePair, 'Português', 'Portugués') : uiText(languagePair, 'Espanhol', 'Español');
  return (
    <section className="bg-slate-900 border-b border-slate-800 px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        <details className="group rounded-xl border border-slate-700 bg-slate-800/70 p-3 flex-1">
          <summary className="cursor-pointer list-none flex items-center justify-between gap-3 text-sm font-semibold text-white"><span><Filter className="w-4 h-4 inline mr-2 text-blue-400" />{uiText(languagePair, `Categorias do estudo: ${selectedCategories.length} selecionadas · ${selectedWordCount} palavras`, `Categorías de estudio: ${selectedCategories.length} seleccionadas · ${selectedWordCount} palabras`)}</span><span className="text-xs text-blue-300 group-open:hidden">{uiText(languagePair, 'Escolher', 'Elegir')}</span><span className="text-xs text-blue-300 hidden group-open:inline">{uiText(languagePair, 'Fechar', 'Cerrar')}</span></summary>
          <div className="pt-3 space-y-3">
            <div className="flex gap-2"><button onClick={onSelectAllCategories} className="px-3 py-1.5 text-xs rounded-lg border border-slate-600 text-slate-200 hover:bg-slate-700">{uiText(languagePair, 'Marcar todas', 'Seleccionar todas')}</button><button onClick={onClearCategories} className="px-3 py-1.5 text-xs rounded-lg border border-slate-600 text-slate-400 hover:bg-slate-700 hover:text-white">{uiText(languagePair, 'Limpar', 'Borrar selección')}</button></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-64 overflow-y-auto pr-1">{categories.map(category => <label key={category} className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer ${selectedCategories.includes(category)?'bg-blue-500/10 border-blue-500/40 text-white':'bg-slate-900/60 border-slate-700 text-slate-300 hover:border-slate-500'}`}><input type="checkbox" checked={selectedCategories.includes(category)} onChange={() => onToggleCategory(category)} className="h-4 w-4 rounded border-slate-500 bg-slate-800 text-blue-500 focus:ring-blue-500" /><span className="flex-1 text-xs">{categoryLabel(category, languagePair)}</span><span className="text-xs text-slate-500">{items.filter(item=>item.category===category).length}</span></label>)}</div>
            <p className="text-xs text-slate-500">{uiText(languagePair, 'Esta seleção limita flashcards, quiz, escrita e glossário. Ela é salva neste navegador.', 'Esta selección limita los flashcards, el cuestionario, la escritura y el glosario. Se guarda en este navegador.')}</p>
          </div>
        </details>
        <label className="flex flex-col gap-1 text-xs text-slate-400 min-w-56">{uiText(languagePair, 'Direção dos exercícios', 'Dirección de los ejercicios')}
          <select value={directionMode} onChange={e => onDirectionChange(e.target.value)} className="bg-slate-800 border border-slate-700 text-slate-100 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
            <option value="en-to-target">{uiText(languagePair, 'Inglês', 'Inglés')} → {targetLanguage}</option>
            <option value="target-to-en">{targetLanguage} → {uiText(languagePair, 'Inglês', 'Inglés')}</option>
            <option value="random">{uiText(languagePair, 'Aleatória', 'Aleatoria')}: {uiText(languagePair, 'Inglês', 'Inglés')} ↔ {targetLanguage}</option>
          </select>
        </label>
      </div>
      <p className="max-w-7xl mx-auto mt-2 text-xs text-slate-500">{uiText(languagePair, 'As categorias limitam todos os modos, inclusive o glossário. A direção vale para flashcards, quiz e escrita; no modo aleatório, cada palavra escolhe uma direção.', 'Las categorías limitan todos los modos, incluido el glosario. La dirección se aplica a los flashcards, el cuestionario y la escritura; en modo aleatorio, cada palabra elige una dirección.')}</p>
    </section>
  );
}

function EmptyStudyDeck({ languagePair }) {
  return <div className="max-w-2xl mx-auto text-center p-10 rounded-2xl border border-slate-700 bg-slate-800"><h2 className="text-lg font-bold text-white">{uiText(languagePair, 'Nenhuma palavra corresponde à seleção', 'Ninguna palabra coincide con la selección')}</h2><p className="text-sm text-slate-400 mt-2">{uiText(languagePair, 'Marque categorias ou ajuste os filtros acima para iniciar o estudo.', 'Selecciona categorías o ajusta los filtros para comenzar a estudiar.')}</p></div>;
}

/* =========================================================================================
   COMPONENTE 1: FLASHCARDS 3D VIEW
   ========================================================================================= */
function FlashcardsView({ items, languagePair, directionMode, speakText, userRatings, onSetRating }) {
  const [deck, setDeck] = useState(items);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [repeatCounts, setRepeatCounts] = useState({});
  const itemsSignature = items.map(item => item.english).join('|');

  useEffect(() => {
    const expandedDeck = [];
    const scheduled = {};
    items.forEach(item => {
      expandedDeck.push(item);
      if (userRatings[item.english] === 'hard') {
        expandedDeck.push(item, item);
        scheduled[item.english] = 2;
      }
    });
    setDeck(expandedDeck);
    setCurrentIndex(0);
    setIsFlipped(false);
    setRepeatCounts(scheduled);
  }, [itemsSignature]);

  const currentItem = deck[currentIndex] || deck[0];
  const direction = useStudyDirection(currentItem, languagePair, directionMode);
  const targetText = currentItem ? (languagePair === 'en-pt' ? currentItem.portuguese : currentItem.spanish) : '';
  const targetLang = languagePair === 'en-pt' ? 'pt' : 'es';
  const frontText = direction === 'en-to-target' ? currentItem?.english : targetText;
  const backText = direction === 'en-to-target' ? targetText : currentItem?.english;
  const frontLangLabel = direction === 'en-to-target' ? `🇺🇸 ${uiText(languagePair, 'Inglês', 'Inglés')}` : (languagePair === 'en-pt' ? `🇧🇷 ${uiText(languagePair, 'Português', 'Portugués')}` : `🇪🇸 ${uiText(languagePair, 'Espanhol', 'Español')}`);
  const backLangLabel = direction === 'en-to-target' ? (languagePair === 'en-pt' ? uiText(languagePair, 'Português', 'Portugués') : uiText(languagePair, 'Espanhol', 'Español')) : uiText(languagePair, 'Inglês', 'Inglés');
  const backLang = direction === 'en-to-target' ? targetLang : 'en';

  useEffect(() => {
    if (!currentItem) return;
    if (direction === 'en-to-target') speakText(currentItem.english, 'en');
    else if (isFlipped) speakText(currentItem.english, 'en');
  }, [currentItem?.english, direction, isFlipped]);

  const handleShuffle = () => {
    setDeck(shuffleItems(deck));
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => setCurrentIndex(prev => (prev + 1) % deck.length), 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => setCurrentIndex(prev => (prev - 1 + deck.length) % deck.length), 150);
  };

  const handleRating = (rating) => {
    onSetRating(currentItem.english, rating);
    if (rating !== 'hard') return;
    const alreadyScheduled = repeatCounts[currentItem.english] || 0;
    const repeatsToAdd = Math.max(0, 2 - alreadyScheduled);
    if (!repeatsToAdd) return;
    setRepeatCounts(prev => ({ ...prev, [currentItem.english]: alreadyScheduled + repeatsToAdd }));
    setDeck(prev => {
      const next = [...prev];
      for (let i = 0; i < repeatsToAdd; i += 1) {
        const insertAt = Math.min(currentIndex + 3 + (i * 3), next.length);
        next.splice(insertAt, 0, currentItem);
      }
      return next;
    });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') { e.preventDefault(); setIsFlipped(prev => !prev); }
      else if (e.code === 'ArrowRight') handleNext();
      else if (e.code === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [deck]);

  if (!currentItem) return null;

  return (
    <div className="flex flex-col items-center max-w-2xl mx-auto space-y-6">
      <div className="w-full flex items-center justify-between text-xs text-slate-400 px-2">
        <span className="font-medium bg-slate-800 px-3 py-1 rounded-full border border-slate-700">{uiText(languagePair, 'Cartão', 'Tarjeta')} <strong className="text-blue-400">{currentIndex + 1}</strong> {uiText(languagePair, 'de', 'de')} <strong>{deck.length}</strong></span>
        <button onClick={handleShuffle} className="flex items-center space-x-1 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full border border-slate-700 transition-colors" title={uiText(languagePair, 'Embaralhar ordem', 'Mezclar orden')}><Shuffle className="w-3.5 h-3.5" /><span>{uiText(languagePair, 'Embaralhar', 'Mezclar')}</span></button>
      </div>

      <div className="w-full h-80 sm:h-96 cursor-pointer" style={{ perspective: '1000px' }} onClick={() => setIsFlipped(prev => !prev)}>
        <div className="relative w-full h-full transition-transform duration-500" style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-850 rounded-2xl border border-slate-700/80 p-6 flex flex-col justify-between shadow-2xl hover:border-blue-500/50 transition-colors" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full uppercase tracking-wider">{categoryLabel(currentItem.category, languagePair)}</span>
              <button onClick={e => { e.stopPropagation(); if (direction === 'en-to-target' || isFlipped) speakText(currentItem.english, 'en'); }} disabled={direction === 'target-to-en' && !isFlipped} className="p-2.5 bg-slate-700/60 hover:bg-blue-600 text-slate-300 hover:text-white rounded-full transition-colors disabled:opacity-40" title={uiText(languagePair, 'Ouvir pronúncia em inglês', 'Escuchar pronunciación en inglés')}><Volume2 className="w-5 h-5" /></button>
            </div>
            <div className="text-center my-auto space-y-3">
              <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{frontText}</p>
              <p className="text-xs text-slate-400">{frontLangLabel}</p>
            </div>
            <div className="text-center"><span className="inline-flex items-center space-x-1 text-xs text-slate-400 bg-slate-900/60 px-3 py-1.5 rounded-full border border-slate-800"><Sparkles className="w-3.5 h-3.5 text-blue-400" /><span>{uiText(languagePair, 'Clique ou pressione [Espaço] para revelar', 'Haz clic o pulsa [Espacio] para revelar') }</span></span></div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-800 to-blue-950/40 rounded-2xl border border-blue-500/40 p-6 flex flex-col justify-between shadow-2xl" style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full uppercase tracking-wider">{backLangLabel}</span>
              <button onClick={e => { e.stopPropagation(); speakText(currentItem.english, 'en'); }} className="p-2.5 bg-slate-700/60 hover:bg-emerald-600 text-slate-300 hover:text-white rounded-full transition-colors" title={uiText(languagePair, 'Ouvir pronúncia em inglês', 'Escuchar pronunciación en inglés')}><Volume2 className="w-5 h-5" /></button>
            </div>
            <div className="text-center my-auto space-y-4 px-2">
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-300">{backText}</p>
              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-700/80 text-left max-h-32 overflow-y-auto">
                <p className="text-xs font-semibold text-blue-400 mb-1 flex items-center space-x-1"><Brain className="w-3.5 h-3.5" /><span>{uiText(languagePair, 'Conceito & Função:', 'Concepto y función:')}</span></p>
                <p className="text-xs text-slate-300 leading-relaxed">{currentItem.definition}</p>
              </div>
            </div>
            <div className="flex justify-center space-x-2 pt-2 border-t border-slate-700/50" onClick={e => e.stopPropagation()}>
              {['easy', 'medium', 'hard'].map((rating, index) => {
                const labels = languagePair === 'en-es' ? ['🟢 Fácil', '🟡 Intermedio', '🔴 Difícil'] : ['🟢 Fácil', '🟡 Médio', '🔴 Difícil'];
                const styles = [
                  ['bg-emerald-600 text-white shadow', 'bg-slate-900 text-emerald-400 hover:bg-emerald-950 border border-emerald-800/50'],
                  ['bg-amber-600 text-white shadow', 'bg-slate-900 text-amber-400 hover:bg-amber-950 border border-amber-800/50'],
                  ['bg-rose-600 text-white shadow', 'bg-slate-900 text-rose-400 hover:bg-rose-950 border border-rose-800/50'],
                ];
                return <button key={rating} onClick={() => handleRating(rating)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${userRatings[currentItem.english] === rating ? styles[index][0] : styles[index][1]}`}>{labels[index]}</button>;
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button onClick={handlePrev} className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-full border border-slate-700 transition-colors shadow-lg" title={uiText(languagePair, 'Anterior', 'Anterior')}><ChevronLeft className="w-6 h-6" /></button>
        <button onClick={() => setIsFlipped(!isFlipped)} className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl shadow-lg text-sm">{isFlipped ? uiText(languagePair, 'Mostrar pergunta', 'Mostrar pregunta') : uiText(languagePair, 'Revelar resposta', 'Revelar respuesta')}</button>
        <button onClick={handleNext} className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-full border border-slate-700 transition-colors shadow-lg" title={uiText(languagePair, 'Próximo', 'Siguiente')}><ChevronRight className="w-6 h-6" /></button>
      </div>
      <p className="text-xs text-slate-500 text-center">{uiText(languagePair, 'Ao marcar uma palavra como difícil, ela retorna à pilha duas vezes para revisão.', 'Al marcar una palabra como difícil, vuelve a la pila dos veces para repasarla.')}</p>
    </div>
  );
}

/* =========================================================================================
   COMPONENTE 2: QUIZ / MULTIPLE CHOICE VIEW
   ========================================================================================= */
function QuizView({ items, languagePair, directionMode, speakText, userRatings, onRecordMistake }) {
  const MAX_WRONG_ANSWERS = 3;
  const RETRY_GAP = 2;
  const [queue, setQueue] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [options, setOptions] = useState([]);
  const [attemptsByTerm, setAttemptsByTerm] = useState({});
  const [isStarted, setIsStarted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [sessionNumber, setSessionNumber] = useState(0);
  const itemsSignature = items.map(item => item.english).join('|');

  useEffect(() => {
    setQueue([]);
    setQuestionIndex(0);
    setSelectedOption(null);
    setShowResult(false);
    setIsStarted(false);
    setIsComplete(false);
  }, [itemsSignature]);

  const currentItem = queue[questionIndex];
  const direction = useStudyDirection(currentItem, languagePair, directionMode);
  const targetText = currentItem ? (languagePair === 'en-pt' ? currentItem.portuguese : currentItem.spanish) : '';
  const questionText = !currentItem ? '' : direction === 'en-to-target' ? currentItem.english : targetText;
  const correctAnswer = !currentItem ? '' : direction === 'en-to-target' ? targetText : currentItem.english;
  const promptLanguage = direction === 'en-to-target' ? uiText(languagePair, 'Inglês', 'Inglés') : (languagePair === 'en-pt' ? uiText(languagePair, 'Português', 'Portugués') : uiText(languagePair, 'Espanhol', 'Español'));
  const answerLanguage = direction === 'en-to-target' ? (languagePair === 'en-pt' ? uiText(languagePair, 'Português', 'Portugués') : uiText(languagePair, 'Espanhol', 'Español')) : uiText(languagePair, 'Inglês', 'Inglés');

  useEffect(() => {
    if (!currentItem || !isStarted) { setOptions([]); return; }
    const distractorCandidates = queue
      .filter(item => item.english !== currentItem.english)
      .map(item => ({
        item,
        answer: direction === 'en-to-target' ? (languagePair === 'en-pt' ? item.portuguese : item.spanish) : item.english,
      }))
      .filter(candidate => candidate.answer && candidate.answer !== correctAnswer)
      .map(candidate => ({
        ...candidate,
        score:
          (candidate.item.category === currentItem.category ? 3 : 0) +
          termSimilarity(correctAnswer, candidate.answer) +
          termSimilarity(currentItem.english, candidate.item.english) + Math.random() * 0.02,
      }))
      .sort((left, right) => right.score - left.score);
    const wrongTargets = [...new Set(distractorCandidates.map(candidate => candidate.answer))].slice(0, 3);
    setOptions(shuffleItems([correctAnswer, ...wrongTargets]));
    setSelectedOption(null);
    setShowResult(false);
  }, [currentItem, direction, languagePair, queue, correctAnswer, isStarted]);

  useEffect(() => {
    if (isStarted && currentItem?.english && direction === 'en-to-target') speakText(currentItem.english, 'en');
  }, [currentItem?.english, sessionNumber, direction]);

  const startQuiz = () => {
    if (!items.length) return;
    setQueue(shuffleItems(items));
    setQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setAnsweredCount(0);
    setAttemptsByTerm({});
    setShowResult(false);
    setIsComplete(false);
    setIsStarted(true);
    setSessionNumber(prev => prev + 1);
  };

  const handleSelectOption = (option) => {
    if (selectedOption !== null || !currentItem) return;
    setSelectedOption(option);
    setShowResult(true);
    setAnsweredCount(prev => prev + 1);
    if (direction === 'target-to-en') speakText(currentItem.english, 'en');
    if (option === correctAnswer) {
      setScore(prev => prev + 1);
      if (direction !== 'target-to-en') speakText(currentItem.english, 'en');
    } else {
      const nextAttempts = (attemptsByTerm[currentItem.english] || 0) + 1;
      setAttemptsByTerm(prev => ({ ...prev, [currentItem.english]: nextAttempts }));
      onRecordMistake(currentItem.english);
    }
  };

  const handleNextQuestion = () => {
    if (!currentItem || selectedOption === null) return;
    let nextQueue = queue;
    if (selectedOption !== correctAnswer && (attemptsByTerm[currentItem.english] || 0) < MAX_WRONG_ANSWERS) {
      nextQueue = [...queue];
      nextQueue.splice(Math.min(questionIndex + RETRY_GAP + 1, nextQueue.length), 0, currentItem);
      setQueue(nextQueue);
    }
    const nextIndex = questionIndex + 1;
    if (nextIndex >= nextQueue.length) {
      setIsComplete(true);
      setSelectedOption(null);
      setShowResult(false);
      return;
    }
    setQuestionIndex(nextIndex);
    setSelectedOption(null);
    setShowResult(false);
  };

  if (!items.length) return <EmptyStudyDeck languagePair={languagePair} />;
  if (!isStarted || !currentItem) {
    return <div className="max-w-2xl mx-auto bg-slate-800 rounded-2xl border border-slate-700 p-8 text-center space-y-4"><Award className="w-12 h-12 text-blue-400 mx-auto" /><h2 className="text-2xl font-bold text-white">{uiText(languagePair, 'Quiz personalizado', 'Cuestionario personalizado')}</h2><p className="text-sm text-slate-400">{uiText(languagePair, `Sessão com ${items.length} palavras das categorias e filtros selecionados acima.`, `Sesión con ${items.length} palabras de las categorías y filtros seleccionados.`)}</p><button onClick={startQuiz} className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl">{uiText(languagePair, 'Começar quiz', 'Comenzar cuestionario')}</button></div>;
  }
  if (isComplete) {
    return <div className="max-w-2xl mx-auto bg-slate-800 rounded-2xl border border-slate-700 p-8 text-center space-y-4"><CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" /><h2 className="text-2xl font-bold text-white">{uiText(languagePair, 'Rodada concluída', 'Ronda completada')}</h2><p className="text-slate-300">{uiText(languagePair, `Você acertou ${score} de ${answeredCount} respostas.`, `Acertaste ${score} de ${answeredCount} respuestas.`)}</p><p className="text-sm text-slate-400">{uiText(languagePair, 'Palavras erradas reaparecem após outras perguntas. Após 2 erros, ficam marcadas como difíceis.', 'Las palabras incorrectas vuelven a aparecer después de otras preguntas. Tras 2 errores, se marcan como difíciles.') }</p><button onClick={startQuiz} className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl">{uiText(languagePair, 'Repetir esta sessão', 'Repetir esta sesión')}</button></div>;
  }

  const wrongCount = attemptsByTerm[currentItem.english] || 0;
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 flex items-center justify-between gap-4"><div><span className="text-xs text-slate-400 block">{uiText(languagePair, 'Progresso da sessão', 'Progreso de la sesión')}</span><span className="text-sm font-bold text-slate-200">{uiText(languagePair, `Pergunta ${questionIndex + 1} de ${queue.length}`, `Pregunta ${questionIndex + 1} de ${queue.length}`)}</span></div><div className="text-right"><span className="text-xs text-slate-400 block">{uiText(languagePair, 'Acertos', 'Aciertos')}</span><span className="text-sm font-bold text-emerald-400">{score} / {answeredCount}</span></div></div>
      <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 shadow-xl space-y-6">
        <div className="flex justify-between items-start gap-3"><div className="flex flex-wrap gap-2"><span className="text-xs font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full uppercase">{currentItem.category}</span>{userRatings[currentItem.english] === 'hard' && <span className="text-xs font-semibold text-rose-300 bg-rose-500/10 border border-rose-500/30 px-3 py-1 rounded-full">{uiText(languagePair, 'Difícil', 'Difícil')}</span>}{wrongCount > 0 && <span className="text-xs font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full">{uiText(languagePair, `Revisão ${wrongCount}`, `Repaso ${wrongCount}`)}</span>}</div><button onClick={() => { if (direction !== 'target-to-en' || showResult) speakText(currentItem.english, 'en'); }} disabled={direction === 'target-to-en' && !showResult} className="p-2 bg-slate-700/60 hover:bg-blue-600 text-slate-300 rounded-full" title={uiText(languagePair, 'Ouvir pronúncia em inglês', 'Escuchar pronunciación en inglés')}><Volume2 className="w-4 h-4" /></button></div>
        <div className="text-center py-2"><p className="text-xs text-slate-400 mb-1">{uiText(languagePair, `Pergunta em ${promptLanguage}: escolha a resposta em ${answerLanguage}.`, `Pregunta en ${promptLanguage}: elige la respuesta en ${answerLanguage}.`)}</p><h2 className="text-3xl font-extrabold text-white">{questionText}</h2></div>
        <div className="space-y-3">{options.map((option, idx) => {let style='bg-slate-900 border-slate-700 text-slate-200 hover:border-slate-500';if(showResult){if(option===correctAnswer)style='bg-emerald-950/80 border-emerald-500 text-emerald-200';else if(option===selectedOption)style='bg-rose-950/80 border-rose-500 text-rose-200';else style='bg-slate-900/40 border-slate-800 text-slate-600 opacity-50';}return <button key={`${option}-${idx}`} onClick={() => handleSelectOption(option)} disabled={showResult} className={`w-full text-left p-4 rounded-xl border text-sm font-semibold transition-all flex items-center justify-between ${style}`}><span>{option}</span>{showResult&&option===correctAnswer&&<CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}{showResult&&option===selectedOption&&option!==correctAnswer&&<XCircle className="w-5 h-5 text-rose-400 shrink-0" />}</button>;})}</div>
        {showResult && <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-700 space-y-2"><p className={`text-sm font-semibold ${selectedOption===correctAnswer?'text-emerald-300':'text-rose-300'}`}>{selectedOption===correctAnswer?uiText(languagePair,'Correto! A pronúncia em inglês foi repetida.','¡Correcto! Se repitió la pronunciación en inglés.'):wrongCount<MAX_WRONG_ANSWERS?uiText(languagePair,'Ainda não. Esta palavra voltará a aparecer nesta sessão.','Aún no. Esta palabra volverá a aparecer en esta sesión.'):uiText(languagePair,'Esta palavra atingiu o limite de tentativas desta rodada.','Esta palabra alcanzó el límite de intentos de esta ronda.')}{selectedOption!==correctAnswer&&wrongCount>=2&&<span className="block mt-1 text-xs text-rose-200">{uiText(languagePair, 'Marcada como difícil após mais de um erro.', 'Marcada como difícil tras más de un error.')}</span>}</p><p className="text-xs text-slate-300 leading-relaxed">{currentItem.definition}</p><button onClick={handleNextQuestion} className="w-full mt-3 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg text-sm flex items-center justify-center space-x-2"><span>{uiText(languagePair, 'Continuar', 'Continuar')}</span><ArrowRight className="w-4 h-4" /></button></div>}
      </div>
    </div>
  );
}

/* =========================================================================================
   COMPONENTE 3: SPELLING / RECALL PRACTICE VIEW
   ========================================================================================= */
function SpellingView({ items, languagePair, directionMode, speakText, onRecordMistake }) {
  const MAX_WRONG_ANSWERS = 3;
  const RETRY_GAP = 2;
  const [queue, setQueue] = useState(items);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [status, setStatus] = useState('idle');
  const [attemptsByTerm, setAttemptsByTerm] = useState({});
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const itemsSignature = items.map(item => item.english).join('|');

  useEffect(() => {
    setQueue(items);
    setCurrentIndex(0);
    setUserInput('');
    setStatus('idle');
    setAttemptsByTerm({});
    setScore(0);
    setIsComplete(false);
  }, [itemsSignature]);

  const currentItem = queue[currentIndex];
  const direction = useStudyDirection(currentItem, languagePair, directionMode);
  const translation = currentItem ? (languagePair === 'en-pt' ? currentItem.portuguese : currentItem.spanish) : '';
  const promptText = !currentItem ? '' : direction === 'en-to-target' ? currentItem.english : translation;
  const targetAnswer = !currentItem ? '' : direction === 'en-to-target' ? translation : currentItem.english;
  const promptLanguage = direction === 'en-to-target' ? uiText(languagePair, 'Inglês', 'Inglés') : (languagePair === 'en-pt' ? uiText(languagePair, 'Português', 'Portugués') : uiText(languagePair, 'Espanhol', 'Español'));
  const answerLanguage = direction === 'en-to-target' ? (languagePair === 'en-pt' ? uiText(languagePair, 'Português', 'Portugués') : uiText(languagePair, 'Espanhol', 'Español')) : uiText(languagePair, 'Inglês', 'Inglés');

  useEffect(() => {
    if (!currentItem) return;
    if (direction === 'en-to-target') speakText(currentItem.english, 'en');
  }, [currentItem?.english, direction]);

  const normalize = (value) => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().replace(/\s+/g, ' ');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userInput.trim() || !currentItem || status !== 'idle') return;
    const candidates = targetAnswer.split(/[\/;|]/).map(value => normalize(value)).filter(Boolean);
    const normalizedInput = normalize(userInput);
    const correct = candidates.includes(normalizedInput) || normalize(targetAnswer) === normalizedInput;
    if (direction === 'target-to-en') speakText(currentItem.english, 'en');
    if (correct) {
      setStatus('correct');
      setScore(prev => prev + 1);
      if (direction !== 'target-to-en') speakText(currentItem.english, 'en');
    } else {
      setStatus('incorrect');
      const nextAttempts = (attemptsByTerm[currentItem.english] || 0) + 1;
      setAttemptsByTerm(prev => ({ ...prev, [currentItem.english]: nextAttempts }));
      onRecordMistake(currentItem.english);
    }
  };

  const handleNext = () => {
    let nextQueue = queue;
    if (status === 'incorrect' && (attemptsByTerm[currentItem.english] || 0) < MAX_WRONG_ANSWERS) {
      nextQueue = [...queue];
      nextQueue.splice(Math.min(currentIndex + RETRY_GAP + 1, nextQueue.length), 0, currentItem);
      setQueue(nextQueue);
    }
    setUserInput('');
    setStatus('idle');
    if (currentIndex + 1 >= nextQueue.length) setIsComplete(true);
    else setCurrentIndex(prev => prev + 1);
  };

  if (isComplete) return <div className="max-w-xl mx-auto bg-slate-800 rounded-2xl border border-slate-700 p-8 text-center space-y-4"><CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" /><h2 className="text-2xl font-bold text-white">{uiText(languagePair, 'Treino concluído', 'Práctica completada')}</h2><p className="text-slate-300">{uiText(languagePair, `Acertos: ${score}. As respostas erradas voltaram à fila.`, `Aciertos: ${score}. Las respuestas incorrectas volvieron a la cola.`)}</p><button onClick={() => { setQueue(items); setCurrentIndex(0); setUserInput(''); setStatus('idle'); setAttemptsByTerm({}); setScore(0); setIsComplete(false); }} className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl">{uiText(languagePair, 'Repetir treino', 'Repetir práctica')}</button></div>;
  if (!currentItem) return <EmptyStudyDeck languagePair={languagePair} />;
  const wrongCount = attemptsByTerm[currentItem.english] || 0;
  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 shadow-xl space-y-6">
        <div className="flex justify-between items-start"><span className="text-xs font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full uppercase">{uiText(languagePair, `Treino de escrita (${currentIndex + 1}/${queue.length}) · ${score} acertos`, `Práctica de escritura (${currentIndex + 1}/${queue.length}) · ${score} aciertos`)}</span><button onClick={() => { if (direction !== 'target-to-en' || status !== 'idle') speakText(currentItem.english, 'en'); }} disabled={direction === 'target-to-en' && status === 'idle'} className="p-2 bg-slate-700/60 hover:bg-blue-600 text-slate-300 rounded-full" title={uiText(languagePair, 'Ouvir pronúncia em inglês', 'Escuchar pronunciación en inglés')}><Volume2 className="w-4 h-4" /></button></div>
        <div className="text-center space-y-2 py-4"><p className="text-xs text-slate-400">{uiText(languagePair, `Pergunta em ${promptLanguage}. Escreva a resposta em ${answerLanguage}:`, `Pregunta en ${promptLanguage}. Escribe la respuesta en ${answerLanguage}:`)}</p><h2 className="text-3xl font-extrabold text-white">{promptText}</h2></div>
        <form onSubmit={handleSubmit} className="space-y-4"><input type="text" value={userInput} onChange={e => setUserInput(e.target.value)} disabled={status !== 'idle'} placeholder={uiText(languagePair, `Digite em ${answerLanguage}...`, `Escribe en ${answerLanguage}...`)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-sm" autoFocus />{status==='idle'&&<button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-sm">{uiText(languagePair, 'Verificar resposta', 'Comprobar respuesta')}</button>}</form>
        {status!=='idle'&&<div className="space-y-4 animate-fade-in">{status==='correct'?<div className="p-4 bg-emerald-950/80 border border-emerald-500/50 rounded-xl text-emerald-200"><p className="font-bold text-sm">{uiText(languagePair, 'Excelente! Resposta correta; a pronúncia em inglês foi repetida.', '¡Excelente! Respuesta correcta; se repitió la pronunciación en inglés.')}</p><p className="text-xs text-emerald-300 mt-1">Resposta: {targetAnswer}</p></div>:<div className="p-4 bg-rose-950/80 border border-rose-500/50 rounded-xl text-rose-200"><p className="font-bold text-sm">{uiText(languagePair, 'Quase lá!', '¡Casi!')}</p><p className="text-xs text-rose-300 mt-1">{uiText(languagePair, 'Resposta correta:', 'Respuesta correcta:')} <strong className="underline">{targetAnswer}</strong></p><p className="text-xs mt-1">{wrongCount<MAX_WRONG_ANSWERS?uiText(languagePair,'A palavra voltará à fila para revisão.','La palabra volverá a la cola para repasarla.'):uiText(languagePair,'Limite de tentativas desta rodada atingido.','Se alcanzó el límite de intentos de esta ronda.')}</p>{wrongCount>=2&&<p className="text-xs text-rose-200 mt-1">{uiText(languagePair, 'Marcada como difícil após mais de um erro.', 'Marcada como difícil tras más de un error.')}</p>}</div>}<div className="bg-slate-900/90 p-4 rounded-xl border border-slate-700 text-xs text-slate-300 leading-relaxed"><span className="font-semibold text-blue-400 block mb-1">{uiText(languagePair, 'Definição:', 'Definición:')}</span>{currentItem.definition}</div><button onClick={handleNext} className="w-full py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-xl text-sm">{uiText(languagePair, 'Próximo termo ➔', 'Siguiente término ➔')}</button></div>}
      </div>
    </div>
  );
}

/* =========================================================================================
   COMPONENTE 4: GLOSSARY TABLE / SEARCH VIEW
   ========================================================================================= */
function GlossaryTableView({ items, languagePair, speakText, userRatings, onSetRating }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center text-xs text-slate-400">
        <span>{uiText(languagePair, 'Exibindo', 'Mostrando')} <strong>{items.length}</strong> {uiText(languagePair, 'termos médicos', 'términos médicos')}</span>
      </div>

      <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/80 text-slate-400 text-xs font-semibold uppercase tracking-wider border-b border-slate-700">
                <th className="py-3.5 px-4">{uiText(languagePair, 'Inglês', 'Inglés')}</th>
                <th className="py-3.5 px-4">{languagePair === 'en-pt' ? uiText(languagePair, 'Português', 'Portugués') : uiText(languagePair, 'Espanhol', 'Español')}</th>
                <th className="py-3.5 px-4 hidden md:table-cell">{uiText(languagePair, 'Categoria', 'Categoría')}</th>
                <th className="py-3.5 px-4 hidden lg:table-cell">{uiText(languagePair, 'Significado / Conceito', 'Significado / Concepto')}</th>
                <th className="py-3.5 px-4 text-center">{uiText(languagePair, 'Nível', 'Nivel')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/60 text-xs sm:text-sm">
              {items.map((item, idx) => {
                const targetText = languagePair === 'en-pt' ? item.portuguese : item.spanish;
                const rating = userRatings[item.english];

                return (
                  <tr key={idx} className="hover:bg-slate-750/50 transition-colors">
                    {/* English */}
                    <td className="py-3.5 px-4 font-bold text-white">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => speakText(item.english, 'en')}
                          className="p-1.5 bg-slate-700/50 hover:bg-blue-600 text-slate-300 hover:text-white rounded-full transition-colors"
                          title={uiText(languagePair, 'Ouvir em Inglês', 'Escuchar en inglés')}
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                        <span>{item.english}</span>
                      </div>
                    </td>

                    {/* Translation */}
                    <td className="py-3.5 px-4 font-semibold text-emerald-400">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => speakText(item.english, 'en')}
                          className="p-1.5 bg-slate-700/50 hover:bg-emerald-600 text-slate-300 hover:text-white rounded-full transition-colors"
                          title={uiText(languagePair, 'Ouvir pronúncia em inglês', 'Escuchar pronunciación en inglés')}
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                        <span>{targetText}</span>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4 hidden md:table-cell text-slate-400">
                      <span className="bg-slate-900 border border-slate-700/80 px-2.5 py-1 rounded-md text-xs">
                        {categoryLabel(item.category, languagePair)}
                      </span>
                    </td>

                    {/* Definition */}
                    <td className="py-3.5 px-4 hidden lg:table-cell text-slate-300 max-w-xs text-xs leading-relaxed">
                      {item.definition}
                    </td>

                    {/* Rating buttons */}
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <button
                          onClick={() => onSetRating(item.english, 'easy')}
                          className={`px-2 py-1 rounded text-xs transition-colors ${
                            rating === 'easy' ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-slate-500 hover:text-emerald-400'
                          }`}
                          title={uiText(languagePair, 'Marcar como Fácil', 'Marcar como fácil')}
                        >
                          🟢
                        </button>
                        <button
                          onClick={() => onSetRating(item.english, 'hard')}
                          className={`px-2 py-1 rounded text-xs transition-colors ${
                            rating === 'hard' ? 'bg-rose-600 text-white' : 'bg-slate-900 text-slate-500 hover:text-rose-400'
                          }`}
                          title={uiText(languagePair, 'Marcar como Difícil', 'Marcar como difícil')}
                        >
                          🔴
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
