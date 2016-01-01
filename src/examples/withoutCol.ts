///<reference path="../app/Col.ts"/>
///<reference path="../app/ColHelper.ts"/>
///<reference path="../app/ColMap.ts"/>
///<reference path="../app/MapHelper.ts"/>


///<reference path="typing.d.ts"/>

class ExamplesWithoutColts {


    static findMostFiveCommonWordAndTheirOccurrences(text:string) {
        var cleanText = text.replace(/[^a-zA-Z0-9\s]/g, "");

        //count words
        var counter = {};
        var wordsArray = cleanText.split(" ");
        for (var i = 0; i < wordsArray.length; i++) {
            if (counter[wordsArray[i]]) {
                counter[wordsArray[i]]++;
            } else {
                counter[wordsArray[i]] = 1;
            }
        }

        //convert to sortable
        var resultArray = [];
        Object.keys(counter).forEach(key => {
            resultArray.push({
                word: key,
                count: counter[key]
            })
        });

        // revere sort
        var sortedArray = resultArray.sort((objA, objB) => {
            if (objA.count > objB.count) {
                return -1;
            } else if (objA.count > objB.count) {
                return 1;
            } else {
                return 0;
            }
        });

        return sortedArray.slice(0, 5);

    }

    static countfavoriteFruitsFromPeopleAbove30(data:GeneratedData[]) {
        var filteredData = data.filter((record) => record.age > 30);
        var counter = {};
        for (var i = 0; i < filteredData.length; i++) {
            if (counter[filteredData[i].favoriteFruit]) {
                counter[filteredData[i].favoriteFruit]++;
            } else {
                counter[filteredData[i].favoriteFruit] = 1;
            }
        }
        return counter;
    }

    static averageBalancePerDecade(data:GeneratedData[]) {
        var counter = {};

        data.forEach((e:GeneratedData) => {

            var decade:string = (Math.floor(e.age / 10)).toString();
            if (!counter[decade]) {
                counter[decade] = {
                    balance: 0,
                    amount: 0
                };
            }
            var balanceNum = parseFloat(e.balance.replace(/[^0-9\.]/g, ""));
            counter[decade].balance += balanceNum;
            counter[decade].amount ++;
        });

        var result = {};
        for (var decades in counter){
            result[decades + "0s"] = counter[decades].balance / counter[decades].amount;
        }

        return result;
    }

}


var res = ExamplesWithoutColts.findMostFiveCommonWordAndTheirOccurrences("la li lo la");
console.log(JSON.stringify(res));


var data = [
    {
        "_id": "567eb18135c35131916674fa",
        "index": 0,
        "guid": "0574dce3-4a3d-4b5c-8c5e-67bc2085b280",
        "isActive": true,
        "balance": "$3,865.60",
        "picture": "http://placehold.it/32x32",
        "age": 24,
        "eyeColor": "blue",
        "name": "Jolene Long",
        "gender": "female",
        "company": "ISOPOP",
        "email": "jolenelong@isopop.com",
        "phone": "+1 (979) 543-3645",
        "address": "252 Oceanic Avenue, Lutsen, Louisiana, 5940",
        "about": "Pariatur sunt officia sint culpa. Minim excepteur velit ut ullamco irure deserunt. Laboris quis ex duis mollit. Qui velit eu proident fugiat dolor nostrud adipisicing culpa officia duis.\r\n",
        "registered": "2015-01-18T07:12:30 -02:00",
        "latitude": 60.892951,
        "longitude": -12.204514,
        "tags": [
            "proident",
            "laborum",
            "ipsum",
            "veniam",
            "sit",
            "enim",
            "magna"
        ],
        "friends": [
            {
                "id": 0,
                "name": "Klein Greer"
            },
            {
                "id": 1,
                "name": "Julie Donovan"
            },
            {
                "id": 2,
                "name": "Vicky Ward"
            }
        ],
        "greeting": "Hello, Jolene Long! You have 10 unread messages.",
        "favoriteFruit": "banana"
    },
    {
        "_id": "567eb18195ac608e1d31dee7",
        "index": 1,
        "guid": "873e8aa7-c77e-4d54-8a17-3037f6f8724b",
        "isActive": true,
        "balance": "$2,810.97",
        "picture": "http://placehold.it/32x32",
        "age": 21,
        "eyeColor": "blue",
        "name": "Keisha Solis",
        "gender": "female",
        "company": "SONGLINES",
        "email": "keishasolis@songlines.com",
        "phone": "+1 (932) 430-3827",
        "address": "354 Wortman Avenue, Ironton, Alabama, 3315",
        "about": "Sit deserunt aute do velit voluptate quis commodo anim cupidatat sit culpa. Elit anim minim ut ut. Cupidatat magna qui minim laboris officia commodo eiusmod pariatur aliquip sint ullamco esse. Consequat commodo cillum consequat dolore irure ad amet ipsum consectetur et. Consectetur sit officia commodo sit. Magna adipisicing deserunt quis incididunt ipsum exercitation cillum quis Lorem anim commodo do voluptate.\r\n",
        "registered": "2014-11-20T03:56:56 -02:00",
        "latitude": -24.135983,
        "longitude": -34.646445,
        "tags": [
            "officia",
            "ex",
            "sit",
            "proident",
            "veniam",
            "enim"
        ],
        "friends": [
            {
                "id": 0,
                "name": "Toni Pennington"
            },
            {
                "id": 1,
                "name": "Paula Parsons"
            },
            {
                "id": 2,
                "name": "Victoria Russo"
            }
        ],
        "greeting": "Hello, Keisha Solis! You have 5 unread messages.",
        "favoriteFruit": "strawberry"
    },
    {
        "_id": "567eb181c12e23592beff71b",
        "index": 2,
        "guid": "b985327f-9c81-4fd9-a158-5f4f42e391cf",
        "isActive": true,
        "balance": "$3,021.82",
        "picture": "http://placehold.it/32x32",
        "age": 24,
        "eyeColor": "blue",
        "name": "Angela Hahn",
        "gender": "female",
        "company": "OVATION",
        "email": "angelahahn@ovation.com",
        "phone": "+1 (979) 515-2832",
        "address": "299 Church Lane, Sardis, Utah, 3030",
        "about": "Non excepteur qui incididunt anim laboris id nulla dolore qui laborum. Irure aliqua irure adipisicing ut. Proident duis quis culpa anim adipisicing officia proident in nisi ut aliqua sit id laboris. Reprehenderit do anim deserunt nostrud enim qui eiusmod incididunt pariatur id sint deserunt laboris.\r\n",
        "registered": "2014-10-21T12:36:49 -03:00",
        "latitude": -74.52049,
        "longitude": -39.704737,
        "tags": [
            "ea",
            "nulla",
            "ipsum",
            "aliqua"
        ],
        "friends": [
            {
                "id": 0,
                "name": "Noreen Chan"
            },
            {
                "id": 1,
                "name": "Jennie Kemp"
            },
            {
                "id": 2,
                "name": "Mcgee Spence"
            }
        ],
        "greeting": "Hello, Angela Hahn! You have 2 unread messages.",
        "favoriteFruit": "apple"
    },
    {
        "_id": "567eb18140d60ee15cfc3d1c",
        "index": 3,
        "guid": "2cf63557-a960-413c-bb42-7684d95957cf",
        "isActive": true,
        "balance": "$3,117.15",
        "picture": "http://placehold.it/32x32",
        "age": 21,
        "eyeColor": "blue",
        "name": "Stephens Marks",
        "gender": "male",
        "company": "CUBIX",
        "email": "stephensmarks@cubix.com",
        "phone": "+1 (818) 490-2859",
        "address": "764 Newel Street, Hinsdale, Tennessee, 4093",
        "about": "Lorem sit elit eiusmod labore anim quis sint dolor consectetur. Ex laborum tempor est laboris in sit aliquip adipisicing fugiat proident in voluptate sunt eiusmod. Eiusmod ea elit nisi incididunt aute labore cupidatat. Anim commodo qui consectetur commodo cillum cupidatat fugiat deserunt veniam. Laborum elit laboris adipisicing exercitation excepteur quis qui magna. Enim eu qui minim aute fugiat non non nostrud elit quis.\r\n",
        "registered": "2015-12-08T10:08:24 -02:00",
        "latitude": -37.177001,
        "longitude": -72.488313,
        "tags": [
            "aute",
            "voluptate",
            "ut",
            "officia"
        ],
        "friends": [
            {
                "id": 0,
                "name": "Kristine Mack"
            },
            {
                "id": 1,
                "name": "Odom Mosley"
            },
            {
                "id": 2,
                "name": "Solomon Mccullough"
            }
        ],
        "greeting": "Hello, Stephens Marks! You have 10 unread messages.",
        "favoriteFruit": "apple"
    },
    {
        "_id": "567eb1810fb44005a1cc414b",
        "index": 4,
        "guid": "6872f67c-28b0-43b8-8fbc-402232d1bdc9",
        "isActive": false,
        "balance": "$3,906.03",
        "picture": "http://placehold.it/32x32",
        "age": 24,
        "eyeColor": "green",
        "name": "Carney Bullock",
        "gender": "male",
        "company": "JASPER",
        "email": "carneybullock@jasper.com",
        "phone": "+1 (821) 492-2820",
        "address": "543 Pierrepont Street, Glenbrook, Kansas, 1920",
        "about": "Eu ad sit est esse duis aliqua cupidatat ullamco excepteur officia. Quis magna dolore laboris sint laborum exercitation labore do nisi sint voluptate nisi velit exercitation. Labore est dolor velit enim veniam irure. Aute sit labore et enim duis do labore fugiat voluptate quis.\r\n",
        "registered": "2014-11-30T02:10:08 -02:00",
        "latitude": 40.025382,
        "longitude": -138.130111,
        "tags": [
            "enim",
            "sunt",
            "amet"
        ],
        "friends": [
            {
                "id": 0,
                "name": "Tabatha Padilla"
            },
            {
                "id": 1,
                "name": "Latonya Mooney"
            },
            {
                "id": 2,
                "name": "Annabelle Finley"
            }
        ],
        "greeting": "Hello, Carney Bullock! You have 2 unread messages.",
        "favoriteFruit": "strawberry"
    },
    {
        "_id": "567eb181a426fc7f467391ca",
        "index": 5,
        "guid": "78a18983-54f1-407b-ac98-50ca4af32eb3",
        "isActive": false,
        "balance": "$1,467.76",
        "picture": "http://placehold.it/32x32",
        "age": 25,
        "eyeColor": "green",
        "name": "Oneil Guerrero",
        "gender": "male",
        "company": "PARCOE",
        "email": "oneilguerrero@parcoe.com",
        "phone": "+1 (974) 450-3026",
        "address": "677 Charles Place, Lynn, Ohio, 1302",
        "about": "Deserunt est minim nulla mollit aute laborum ullamco amet aliquip nulla non occaecat. Laboris eu aute excepteur ex voluptate voluptate amet in voluptate cupidatat qui irure deserunt. Cupidatat sunt fugiat id duis et dolore Lorem laboris nostrud exercitation occaecat minim.\r\n",
        "registered": "2014-03-28T06:19:13 -03:00",
        "latitude": 87.060826,
        "longitude": -41.930295,
        "tags": [
            "voluptate",
            "labore",
            "eu"
        ],
        "friends": [
            {
                "id": 0,
                "name": "Delaney Harrell"
            },
            {
                "id": 1,
                "name": "Small Morin"
            },
            {
                "id": 2,
                "name": "Harper Wagner"
            }
        ],
        "greeting": "Hello, Oneil Guerrero! You have 2 unread messages.",
        "favoriteFruit": "apple"
    },
    {
        "_id": "567eb18180721b96c8ef822d",
        "index": 6,
        "guid": "4533eac5-3249-4a89-a528-ae5e493588e3",
        "isActive": true,
        "balance": "$3,809.24",
        "picture": "http://placehold.it/32x32",
        "age": 31,
        "eyeColor": "green",
        "name": "Keith Banks",
        "gender": "male",
        "company": "OTHERSIDE",
        "email": "keithbanks@otherside.com",
        "phone": "+1 (998) 557-3645",
        "address": "721 Vanderveer Street, Healy, Guam, 3830",
        "about": "Id id qui sit magna in aliqua laboris ad ex proident culpa do eiusmod eu. Nulla aliqua officia laborum elit. Pariatur magna voluptate ipsum cillum in pariatur veniam labore ut. Nulla sit dolore sunt reprehenderit.\r\n",
        "registered": "2015-06-01T08:03:46 -03:00",
        "latitude": 13.353712,
        "longitude": 12.495007,
        "tags": [
            "eiusmod",
            "est",
            "mollit",
            "esse",
            "Lorem",
            "nisi"
        ],
        "friends": [
            {
                "id": 0,
                "name": "Cash Ayers"
            },
            {
                "id": 1,
                "name": "Vonda Fitzgerald"
            },
            {
                "id": 2,
                "name": "Adams Whitehead"
            }
        ],
        "greeting": "Hello, Keith Banks! You have 9 unread messages.",
        "favoriteFruit": "banana"
    },
    {
        "_id": "567eb1815605d45a4b80f23d",
        "index": 7,
        "guid": "14e8aa9f-b219-48cd-8295-ee73c2ee6ef0",
        "isActive": true,
        "balance": "$2,614.85",
        "picture": "http://placehold.it/32x32",
        "age": 23,
        "eyeColor": "brown",
        "name": "Elisa Hensley",
        "gender": "female",
        "company": "PORTICA",
        "email": "elisahensley@portica.com",
        "phone": "+1 (842) 515-3736",
        "address": "126 Seagate Avenue, Cashtown, Illinois, 4408",
        "about": "Consectetur nisi est minim id cillum. Incididunt veniam eiusmod veniam ipsum exercitation aute veniam do consectetur. Esse labore mollit et aute ut ipsum labore excepteur magna adipisicing commodo tempor voluptate.\r\n",
        "registered": "2014-03-17T04:44:10 -02:00",
        "latitude": -10.715499,
        "longitude": 9.445837,
        "tags": [
            "qui",
            "consequat",
            "minim"
        ],
        "friends": [
            {
                "id": 0,
                "name": "Sophie Pruitt"
            },
            {
                "id": 1,
                "name": "Josefa Foster"
            },
            {
                "id": 2,
                "name": "Chang Ray"
            }
        ],
        "greeting": "Hello, Elisa Hensley! You have 10 unread messages.",
        "favoriteFruit": "strawberry"
    },
    {
        "_id": "567eb1814ae0100c03b887c2",
        "index": 8,
        "guid": "a55f59f8-7955-4ca9-97ec-daf63c8a6ea7",
        "isActive": false,
        "balance": "$3,650.73",
        "picture": "http://placehold.it/32x32",
        "age": 32,
        "eyeColor": "green",
        "name": "Nancy Mcpherson",
        "gender": "female",
        "company": "MARTGO",
        "email": "nancymcpherson@martgo.com",
        "phone": "+1 (895) 435-2261",
        "address": "788 Bridgewater Street, Edenburg, Vermont, 7809",
        "about": "Velit mollit occaecat eiusmod sunt aute aliqua magna tempor non dolor. Lorem ad ea eiusmod adipisicing est velit. Dolore irure enim adipisicing ipsum reprehenderit dolor. Tempor consequat minim esse laborum fugiat cillum excepteur reprehenderit. Proident eiusmod dolor elit laborum. Nulla minim quis officia dolore duis dolor ad. Do qui duis duis nisi aliquip adipisicing dolor ut dolor.\r\n",
        "registered": "2014-04-06T12:50:47 -03:00",
        "latitude": -33.509129,
        "longitude": -55.383717,
        "tags": [
            "laboris",
            "deserunt",
            "cillum"
        ],
        "friends": [
            {
                "id": 0,
                "name": "Whitaker Bradford"
            },
            {
                "id": 1,
                "name": "Willa Myers"
            },
            {
                "id": 2,
                "name": "Cleveland Flynn"
            }
        ],
        "greeting": "Hello, Nancy Mcpherson! You have 4 unread messages.",
        "favoriteFruit": "melon"
    },
    {
        "_id": "567eb181c508d68eb42af75b",
        "index": 9,
        "guid": "b98eaf9e-b150-43c2-a899-c25ffba91d78",
        "isActive": false,
        "balance": "$1,384.97",
        "picture": "http://placehold.it/32x32",
        "age": 31,
        "eyeColor": "brown",
        "name": "Vazquez Hubbard",
        "gender": "male",
        "company": "BYTREX",
        "email": "vazquezhubbard@bytrex.com",
        "phone": "+1 (981) 419-2044",
        "address": "998 Reeve Place, Foxworth, Kentucky, 1232",
        "about": "Ex nisi non consequat cillum voluptate consectetur eiusmod et consequat ea tempor cupidatat velit sint. Ullamco et proident pariatur mollit amet consequat nulla. Eu pariatur commodo qui nulla. Do Lorem voluptate ipsum reprehenderit esse non sit quis Lorem consequat fugiat esse officia. Amet ex Lorem velit cillum sit sint mollit anim commodo laborum sunt. Commodo incididunt do proident nulla elit Lorem laboris consequat culpa esse duis aute Lorem. Est anim do voluptate cupidatat cillum consequat cupidatat ipsum.\r\n",
        "registered": "2015-08-14T02:13:59 -03:00",
        "latitude": 70.15062,
        "longitude": 165.991921,
        "tags": [
            "qui",
            "aliqua",
            "laboris",
            "culpa",
            "nostrud"
        ],
        "friends": [
            {
                "id": 0,
                "name": "Mclean Tucker"
            },
            {
                "id": 1,
                "name": "Willis Casey"
            },
            {
                "id": 2,
                "name": "Della Vega"
            }
        ],
        "greeting": "Hello, Vazquez Hubbard! You have 7 unread messages.",
        "favoriteFruit": "strawberry"
    },
    {
        "_id": "567eb1817d1ac1b2d0ffcd73",
        "index": 10,
        "guid": "f2956814-43aa-4f64-a804-67fe89df20e3",
        "isActive": false,
        "balance": "$3,272.89",
        "picture": "http://placehold.it/32x32",
        "age": 39,
        "eyeColor": "brown",
        "name": "Martinez Adams",
        "gender": "male",
        "company": "PROTODYNE",
        "email": "martinezadams@protodyne.com",
        "phone": "+1 (807) 537-2114",
        "address": "504 Barlow Drive, Rowe, Indiana, 6605",
        "about": "Elit aute laborum pariatur deserunt Lorem quis voluptate culpa. Nostrud sint elit sint qui incididunt id velit sit amet aliqua consectetur. Incididunt fugiat nisi adipisicing labore reprehenderit voluptate irure ut culpa commodo. Exercitation aute dolor non duis enim sunt cillum. Elit dolor excepteur aute consequat voluptate dolore. Veniam irure officia eiusmod in occaecat irure esse dolore veniam ea aute velit amet dolor. Minim amet officia magna irure sit excepteur.\r\n",
        "registered": "2015-05-29T09:21:53 -03:00",
        "latitude": 29.194684,
        "longitude": -35.036944,
        "tags": [
            "do",
            "Lorem",
            "nisi",
            "labore"
        ],
        "friends": [
            {
                "id": 0,
                "name": "Graciela Compton"
            },
            {
                "id": 1,
                "name": "Martha Rivers"
            },
            {
                "id": 2,
                "name": "Riggs Peterson"
            }
        ],
        "greeting": "Hello, Martinez Adams! You have 4 unread messages.",
        "favoriteFruit": "apple"
    },
    {
        "_id": "567eb1810fcd5a3e9f9eda0d",
        "index": 11,
        "guid": "7408826f-9c5d-4e73-818a-b6cacb01815d",
        "isActive": false,
        "balance": "$3,987.23",
        "picture": "http://placehold.it/32x32",
        "age": 20,
        "eyeColor": "brown",
        "name": "Greer Quinn",
        "gender": "male",
        "company": "GINKOGENE",
        "email": "greerquinn@ginkogene.com",
        "phone": "+1 (922) 432-2176",
        "address": "293 Coleridge Street, Strong, West Virginia, 209",
        "about": "Pariatur velit exercitation ullamco anim consequat qui culpa dolore. Enim ipsum sint pariatur velit labore tempor minim pariatur eu qui nulla. Aliqua quis aute magna excepteur. Enim veniam excepteur fugiat ea aliqua laborum. Magna irure aute do esse. Incididunt elit elit ipsum ullamco dolor ullamco ipsum elit.\r\n",
        "registered": "2014-05-17T01:16:59 -03:00",
        "latitude": 43.463567,
        "longitude": -4.795349,
        "tags": [
            "ea",
            "sit",
            "officia"
        ],
        "friends": [
            {
                "id": 0,
                "name": "Loretta Knox"
            },
            {
                "id": 1,
                "name": "Juliette Chavez"
            },
            {
                "id": 2,
                "name": "Koch Park"
            }
        ],
        "greeting": "Hello, Greer Quinn! You have 5 unread messages.",
        "favoriteFruit": "apple"
    },
    {
        "_id": "567eb1816d71c907e01146e5",
        "index": 12,
        "guid": "1bacb68e-d321-4f3c-9824-943594f92e7d",
        "isActive": true,
        "balance": "$1,293.06",
        "picture": "http://placehold.it/32x32",
        "age": 29,
        "eyeColor": "blue",
        "name": "Gamble Moran",
        "gender": "male",
        "company": "ZISIS",
        "email": "gamblemoran@zisis.com",
        "phone": "+1 (892) 503-2048",
        "address": "303 Nolans Lane, Kohatk, Wisconsin, 2330",
        "about": "Quis enim adipisicing est sit ipsum fugiat eu exercitation magna. Anim minim sint id culpa excepteur cillum sit sit qui occaecat in fugiat. Nulla do irure laborum esse ut eiusmod veniam fugiat aliquip voluptate fugiat. Non nisi sint sit aliqua reprehenderit aute. Sint aute aliqua elit ex quis culpa adipisicing. Commodo cillum incididunt veniam ipsum ea.\r\n",
        "registered": "2015-12-24T07:07:20 -02:00",
        "latitude": 78.492359,
        "longitude": 13.84969,
        "tags": [
            "magna",
            "occaecat",
            "aliqua",
            "deserunt",
            "sunt",
            "incididunt",
            "elit"
        ],
        "friends": [
            {
                "id": 0,
                "name": "Ana Barnett"
            },
            {
                "id": 1,
                "name": "Suzanne Mcknight"
            },
            {
                "id": 2,
                "name": "Tammie Santiago"
            }
        ],
        "greeting": "Hello, Gamble Moran! You have 6 unread messages.",
        "favoriteFruit": "melon"
    },
    {
        "_id": "567eb18135632103f06ca952",
        "index": 13,
        "guid": "81faa3c1-c511-4283-9433-69d52de0c9b9",
        "isActive": false,
        "balance": "$3,139.33",
        "picture": "http://placehold.it/32x32",
        "age": 26,
        "eyeColor": "brown",
        "name": "Hallie Charles",
        "gender": "female",
        "company": "QUADEEBO",
        "email": "halliecharles@quadeebo.com",
        "phone": "+1 (930) 400-2439",
        "address": "656 Seton Place, Fontanelle, South Carolina, 1649",
        "about": "Officia officia amet aliqua tempor ut commodo. Anim dolor pariatur labore aute. Minim aliquip aliqua nostrud veniam anim adipisicing ipsum qui aliquip voluptate duis et. Quis mollit adipisicing excepteur non pariatur nulla veniam duis et ipsum. Sint magna deserunt eu culpa tempor.\r\n",
        "registered": "2014-02-20T09:07:52 -02:00",
        "latitude": -79.359174,
        "longitude": 114.686971,
        "tags": [
            "commodo",
            "aliqua",
            "esse",
            "incididunt",
            "do",
            "ea",
            "laborum"
        ],
        "friends": [
            {
                "id": 0,
                "name": "Priscilla Potts"
            },
            {
                "id": 1,
                "name": "Barnett Rutledge"
            },
            {
                "id": 2,
                "name": "Gonzalez Maldonado"
            }
        ],
        "greeting": "Hello, Hallie Charles! You have 3 unread messages.",
        "favoriteFruit": "strawberry"
    },
    {
        "_id": "567eb1814f638ed767c56268",
        "index": 14,
        "guid": "75d9410b-942b-45ea-8b73-f4d04fa7df79",
        "isActive": true,
        "balance": "$3,864.11",
        "picture": "http://placehold.it/32x32",
        "age": 29,
        "eyeColor": "blue",
        "name": "Barbra Cameron",
        "gender": "female",
        "company": "ANOCHA",
        "email": "barbracameron@anocha.com",
        "phone": "+1 (932) 513-3131",
        "address": "891 Martense Street, Crayne, Florida, 5692",
        "about": "Do eiusmod excepteur nostrud laborum aliqua elit pariatur tempor. Lorem do ex eu excepteur consequat est cupidatat non anim laboris proident. Lorem fugiat anim in Lorem nulla reprehenderit sunt proident est esse amet sunt dolore. Nisi pariatur non dolor sit sunt pariatur dolore duis occaecat sit. Reprehenderit laborum Lorem consectetur velit irure incididunt exercitation mollit magna culpa minim culpa in nostrud. Eu veniam fugiat ipsum nostrud.\r\n",
        "registered": "2014-12-01T09:00:19 -02:00",
        "latitude": -43.306529,
        "longitude": -144.515272,
        "tags": [
            "id",
            "ad",
            "occaecat"
        ],
        "friends": [
            {
                "id": 0,
                "name": "Mcclain Bishop"
            },
            {
                "id": 1,
                "name": "Nora Keith"
            },
            {
                "id": 2,
                "name": "Garrison Young"
            }
        ],
        "greeting": "Hello, Barbra Cameron! You have 5 unread messages.",
        "favoriteFruit": "apple"
    },
    {
        "_id": "567eb18157834f0a414d3e0c",
        "index": 15,
        "guid": "ceb11ba8-df58-4b83-b5f9-5be116676ff3",
        "isActive": true,
        "balance": "$2,859.36",
        "picture": "http://placehold.it/32x32",
        "age": 38,
        "eyeColor": "green",
        "name": "Heath Copeland",
        "gender": "male",
        "company": "RADIANTIX",
        "email": "heathcopeland@radiantix.com",
        "phone": "+1 (820) 462-2926",
        "address": "169 Kent Avenue, Morgandale, Pennsylvania, 1011",
        "about": "Deserunt do elit dolor mollit culpa Lorem tempor ex. Occaecat consequat esse sit dolore deserunt ex. Cupidatat est cillum tempor sint velit id aute enim elit in dolor. Exercitation eiusmod Lorem dolore velit sint id fugiat et. Exercitation sunt duis ullamco voluptate nulla minim laborum quis sit dolore occaecat irure. Irure exercitation ad nulla culpa culpa fugiat deserunt nulla ex ut. Aute anim proident anim culpa deserunt voluptate non consectetur Lorem veniam irure.\r\n",
        "registered": "2015-05-09T04:43:15 -03:00",
        "latitude": -30.905357,
        "longitude": -69.32637,
        "tags": [
            "do",
            "sunt",
            "eu",
            "nostrud",
            "fugiat",
            "magna",
            "incididunt"
        ],
        "friends": [
            {
                "id": 0,
                "name": "Sherry Barton"
            },
            {
                "id": 1,
                "name": "Clemons Atkinson"
            },
            {
                "id": 2,
                "name": "Alba Cain"
            }
        ],
        "greeting": "Hello, Heath Copeland! You have 2 unread messages.",
        "favoriteFruit": "apple"
    },
    {
        "_id": "567eb181d6d16041ccea53a4",
        "index": 16,
        "guid": "e77f6afe-cd2a-4d95-8635-de292dfab152",
        "isActive": true,
        "balance": "$1,993.92",
        "picture": "http://placehold.it/32x32",
        "age": 29,
        "eyeColor": "blue",
        "name": "Erika Mckay",
        "gender": "female",
        "company": "ENERSOL",
        "email": "erikamckay@enersol.com",
        "phone": "+1 (990) 456-3218",
        "address": "983 Bedford Avenue, Kieler, Washington, 4314",
        "about": "Id duis adipisicing ea in proident nulla consectetur. Cupidatat esse sint consectetur ea enim labore fugiat sint cupidatat deserunt ea ut. Ad anim veniam sunt do. Duis deserunt ipsum duis voluptate mollit irure cillum officia irure cupidatat.\r\n",
        "registered": "2014-05-21T04:45:27 -03:00",
        "latitude": 67.262424,
        "longitude": -47.478386,
        "tags": [
            "consectetur",
            "irure",
            "laboris"
        ],
        "friends": [
            {
                "id": 0,
                "name": "Elise Flowers"
            },
            {
                "id": 1,
                "name": "Lane Joyner"
            },
            {
                "id": 2,
                "name": "Dana Coffey"
            }
        ],
        "greeting": "Hello, Erika Mckay! You have 1 unread messages.",
        "favoriteFruit": "melon"
    },
    {
        "_id": "567eb181683a16ecce589058",
        "index": 17,
        "guid": "b0df193e-21a8-43b6-b01d-1536ea1ffb52",
        "isActive": false,
        "balance": "$2,911.55",
        "picture": "http://placehold.it/32x32",
        "age": 27,
        "eyeColor": "brown",
        "name": "Reese Branch",
        "gender": "male",
        "company": "ENJOLA",
        "email": "reesebranch@enjola.com",
        "phone": "+1 (969) 583-2947",
        "address": "775 Rutledge Street, Itmann, Oregon, 7855",
        "about": "Consectetur minim veniam ipsum voluptate. Qui velit consectetur eiusmod enim et. Deserunt incididunt fugiat deserunt eu sit.\r\n",
        "registered": "2015-07-18T10:35:08 -03:00",
        "latitude": 13.544479,
        "longitude": 111.856889,
        "tags": [
            "fugiat",
            "exercitation",
            "duis"
        ],
        "friends": [
            {
                "id": 0,
                "name": "Shepherd Wheeler"
            },
            {
                "id": 1,
                "name": "Leanna Lucas"
            },
            {
                "id": 2,
                "name": "Valdez Peck"
            }
        ],
        "greeting": "Hello, Reese Branch! You have 5 unread messages.",
        "favoriteFruit": "apple"
    },
    {
        "_id": "567eb181e9b1577b585eef1b",
        "index": 18,
        "guid": "39a98df8-2acd-430e-9057-86abaff248a2",
        "isActive": true,
        "balance": "$2,185.98",
        "picture": "http://placehold.it/32x32",
        "age": 40,
        "eyeColor": "brown",
        "name": "Ursula Pollard",
        "gender": "female",
        "company": "KYAGURU",
        "email": "ursulapollard@kyaguru.com",
        "phone": "+1 (868) 583-2051",
        "address": "278 Jackson Court, Levant, Wyoming, 6144",
        "about": "Labore esse aliquip laborum ullamco cupidatat ad sint esse velit mollit. Ea fugiat eu nisi consequat laborum laboris anim qui voluptate labore tempor. Nostrud in mollit adipisicing do.\r\n",
        "registered": "2014-10-27T04:30:08 -02:00",
        "latitude": 37.636069,
        "longitude": 90.987152,
        "tags": [
            "eiusmod",
            "ullamco",
            "dolor",
            "veniam",
            "consectetur",
            "id",
            "Lorem"
        ],
        "friends": [
            {
                "id": 0,
                "name": "Pate Meyers"
            },
            {
                "id": 1,
                "name": "Queen Wilson"
            },
            {
                "id": 2,
                "name": "Jeanine Mendez"
            }
        ],
        "greeting": "Hello, Ursula Pollard! You have 1 unread messages.",
        "favoriteFruit": "apple"
    },
    {
        "_id": "567eb1811afe4a096f358b71",
        "index": 19,
        "guid": "344fa2af-7fda-4420-b8d5-a010d7418b80",
        "isActive": false,
        "balance": "$3,516.78",
        "picture": "http://placehold.it/32x32",
        "age": 33,
        "eyeColor": "brown",
        "name": "Helena Gray",
        "gender": "female",
        "company": "GENEKOM",
        "email": "helenagray@genekom.com",
        "phone": "+1 (883) 474-2209",
        "address": "233 Milford Street, Vallonia, Arkansas, 3894",
        "about": "Cupidatat aliqua do commodo commodo voluptate deserunt cillum ipsum culpa laboris amet. Dolor fugiat officia veniam qui aute nisi incididunt magna aute. Nulla fugiat cillum tempor sit adipisicing incididunt duis ullamco esse. Nulla cupidatat duis irure ullamco reprehenderit dolor. Excepteur adipisicing ut exercitation amet incididunt ullamco eu aliquip adipisicing. Labore nisi quis officia sit dolore incididunt deserunt nulla aliquip esse duis dolor. Ullamco pariatur laborum et eu nulla.\r\n",
        "registered": "2014-07-22T12:41:11 -03:00",
        "latitude": 13.46241,
        "longitude": -28.720656,
        "tags": [
            "mollit",
            "nulla",
            "fugiat",
            "reprehenderit",
            "aliqua"
        ],
        "friends": [
            {
                "id": 0,
                "name": "Carter Booker"
            },
            {
                "id": 1,
                "name": "Ball Cannon"
            },
            {
                "id": 2,
                "name": "Francisca Mathews"
            }
        ],
        "greeting": "Hello, Helena Gray! You have 7 unread messages.",
        "favoriteFruit": "strawberry"
    },
    {
        "_id": "567eb181c696e55f1e25d3b9",
        "index": 20,
        "guid": "d4f84dd3-a485-42e6-bd78-7e3ffc2d9b8c",
        "isActive": true,
        "balance": "$3,577.04",
        "picture": "http://placehold.it/32x32",
        "age": 22,
        "eyeColor": "blue",
        "name": "Sargent Harris",
        "gender": "male",
        "company": "EXOSPEED",
        "email": "sargentharris@exospeed.com",
        "phone": "+1 (829) 457-2543",
        "address": "856 Branton Street, Fivepointville, Minnesota, 8914",
        "about": "Enim minim tempor pariatur et. Reprehenderit elit ullamco mollit culpa adipisicing quis tempor proident do do pariatur magna labore. Et eu mollit eiusmod velit quis aliqua. Ipsum anim quis anim nostrud.\r\n",
        "registered": "2014-05-17T06:03:04 -03:00",
        "latitude": 54.203696,
        "longitude": -111.531348,
        "tags": [
            "labore",
            "laborum",
            "esse",
            "sint"
        ],
        "friends": [
            {
                "id": 0,
                "name": "Brooke Skinner"
            },
            {
                "id": 1,
                "name": "Lynette Hamilton"
            },
            {
                "id": 2,
                "name": "Bender Sharpe"
            }
        ],
        "greeting": "Hello, Sargent Harris! You have 5 unread messages.",
        "favoriteFruit": "apple"
    },
    {
        "_id": "567eb18188d0b379240c9f17",
        "index": 21,
        "guid": "aa0d7be7-7607-4c53-86ec-d27eaca07723",
        "isActive": true,
        "balance": "$1,912.31",
        "picture": "http://placehold.it/32x32",
        "age": 20,
        "eyeColor": "blue",
        "name": "Deann Cruz",
        "gender": "female",
        "company": "MATRIXITY",
        "email": "deanncruz@matrixity.com",
        "phone": "+1 (811) 417-3584",
        "address": "116 Manhattan Avenue, Norwood, Federated States Of Micronesia, 8088",
        "about": "Cupidatat veniam id eu commodo sunt cillum est proident nisi. Aute magna eu occaecat pariatur reprehenderit incididunt elit. Anim magna ex proident voluptate nostrud laboris ipsum. Occaecat ut non aliquip aliqua.\r\n",
        "registered": "2014-06-29T08:13:33 -03:00",
        "latitude": -6.241508,
        "longitude": 82.608927,
        "tags": [
            "eiusmod",
            "voluptate",
            "laboris",
            "dolore"
        ],
        "friends": [
            {
                "id": 0,
                "name": "Kim Hernandez"
            },
            {
                "id": 1,
                "name": "Mcdonald Washington"
            },
            {
                "id": 2,
                "name": "Lamb Downs"
            }
        ],
        "greeting": "Hello, Deann Cruz! You have 1 unread messages.",
        "favoriteFruit": "strawberry"
    },
    {
        "_id": "567eb18138de3dbb6c9a0ca7",
        "index": 22,
        "guid": "07b76258-2022-4bb9-b142-40bbeead47b0",
        "isActive": false,
        "balance": "$1,327.17",
        "picture": "http://placehold.it/32x32",
        "age": 25,
        "eyeColor": "brown",
        "name": "Bridget Holloway",
        "gender": "female",
        "company": "CENTICE",
        "email": "bridgetholloway@centice.com",
        "phone": "+1 (942) 491-2882",
        "address": "573 Rockwell Place, Emison, Montana, 812",
        "about": "Sint id dolore in reprehenderit et nisi eu et. Et ad laborum occaecat ex consequat nulla in voluptate dolore dolor minim anim ut qui. Labore ullamco incididunt occaecat ipsum. Ullamco in velit mollit sit.\r\n",
        "registered": "2015-02-08T04:39:40 -02:00",
        "latitude": -27.009758,
        "longitude": 58.622933,
        "tags": [
            "ex",
            "elit",
            "nisi",
            "minim",
            "commodo",
            "velit",
            "mollit"
        ],
        "friends": [
            {
                "id": 0,
                "name": "Gaines Thornton"
            },
            {
                "id": 1,
                "name": "Donna Hodge"
            },
            {
                "id": 2,
                "name": "Sanford Brock"
            }
        ],
        "greeting": "Hello, Bridget Holloway! You have 4 unread messages.",
        "favoriteFruit": "apple"
    },
    {
        "_id": "567eb181d9bd3983e96b6625",
        "index": 23,
        "guid": "02a30307-05b2-4b03-8ddf-bcf4c1e8a088",
        "isActive": true,
        "balance": "$3,805.16",
        "picture": "http://placehold.it/32x32",
        "age": 21,
        "eyeColor": "brown",
        "name": "Sykes Clements",
        "gender": "male",
        "company": "COMVOY",
        "email": "sykesclements@comvoy.com",
        "phone": "+1 (961) 491-3942",
        "address": "640 Havens Place, Zeba, Georgia, 8592",
        "about": "Amet dolor ullamco aute minim eu proident et cupidatat eiusmod anim incididunt. Minim exercitation ad ex aute reprehenderit occaecat tempor ea pariatur. Culpa nulla sit tempor culpa minim irure duis amet enim Lorem ut et in et. Culpa occaecat laborum proident eu incididunt minim amet exercitation ad commodo dolore. Nulla exercitation nostrud nostrud commodo. Et aliqua officia laboris est adipisicing magna officia. Ut duis irure consectetur amet quis.\r\n",
        "registered": "2014-03-05T01:28:00 -02:00",
        "latitude": -32.534335,
        "longitude": -179.858057,
        "tags": [
            "anim",
            "ea",
            "nisi",
            "sint",
            "aute",
            "duis",
            "ad"
        ],
        "friends": [
            {
                "id": 0,
                "name": "Hancock Reeves"
            },
            {
                "id": 1,
                "name": "Hogan Kirby"
            },
            {
                "id": 2,
                "name": "Mccoy Barrera"
            }
        ],
        "greeting": "Hello, Sykes Clements! You have 4 unread messages.",
        "favoriteFruit": "strawberry"
    },
    {
        "_id": "567eb1819ebd8acd827054dd",
        "index": 24,
        "guid": "b4df338c-5eee-496b-9456-d3c6c92a4c34",
        "isActive": true,
        "balance": "$2,280.99",
        "picture": "http://placehold.it/32x32",
        "age": 36,
        "eyeColor": "blue",
        "name": "Susanne Nixon",
        "gender": "female",
        "company": "MAGNAFONE",
        "email": "susannenixon@magnafone.com",
        "phone": "+1 (809) 454-3255",
        "address": "296 Middleton Street, Lorraine, Alaska, 1693",
        "about": "Culpa irure consectetur minim nisi consectetur ipsum. Magna aute eiusmod mollit consequat sint ex voluptate in consequat ipsum ea. Veniam laborum anim excepteur Lorem ut ullamco eiusmod aliquip. Sunt labore voluptate non minim non fugiat veniam magna amet exercitation dolore ut. Reprehenderit adipisicing proident quis minim. Elit cupidatat labore in ad consectetur incididunt duis sit proident duis officia. Id labore quis nulla aliquip non eu dolor proident magna.\r\n",
        "registered": "2014-11-09T01:52:32 -02:00",
        "latitude": 18.696272,
        "longitude": 119.896635,
        "tags": [
            "id",
            "velit",
            "amet",
            "quis",
            "proident",
            "excepteur",
            "aliquip"
        ],
        "friends": [
            {
                "id": 0,
                "name": "Fowler Franco"
            },
            {
                "id": 1,
                "name": "Shawna Baldwin"
            },
            {
                "id": 2,
                "name": "Jessica Aguilar"
            }
        ],
        "greeting": "Hello, Susanne Nixon! You have 3 unread messages.",
        "favoriteFruit": "melon"
    },
    {
        "_id": "567eb181514159a4cba945cc",
        "index": 25,
        "guid": "903d7a98-65e6-4e76-8c17-8e6fc2607167",
        "isActive": true,
        "balance": "$1,256.49",
        "picture": "http://placehold.it/32x32",
        "age": 35,
        "eyeColor": "green",
        "name": "Clayton Solomon",
        "gender": "male",
        "company": "JOVIOLD",
        "email": "claytonsolomon@joviold.com",
        "phone": "+1 (804) 558-3812",
        "address": "304 Pineapple Street, Nipinnawasee, Marshall Islands, 8497",
        "about": "Reprehenderit proident non duis fugiat ea proident deserunt quis tempor incididunt pariatur. Amet elit irure laborum eiusmod irure nulla veniam. Eiusmod excepteur reprehenderit non fugiat consectetur eiusmod do elit voluptate velit officia deserunt voluptate excepteur. Id duis irure incididunt amet mollit minim sint.\r\n",
        "registered": "2014-09-05T10:54:49 -03:00",
        "latitude": -16.900728,
        "longitude": -169.103218,
        "tags": [
            "est",
            "tempor",
            "labore",
            "amet",
            "eu",
            "veniam"
        ],
        "friends": [
            {
                "id": 0,
                "name": "Matthews Palmer"
            },
            {
                "id": 1,
                "name": "Gregory Parks"
            },
            {
                "id": 2,
                "name": "Pearlie Bonner"
            }
        ],
        "greeting": "Hello, Clayton Solomon! You have 8 unread messages.",
        "favoriteFruit": "melon"
    },
    {
        "_id": "567eb18184573c751445caef",
        "index": 26,
        "guid": "4a6ed81c-6dd6-4ac8-90b4-b0f5e975b551",
        "isActive": true,
        "balance": "$1,473.54",
        "picture": "http://placehold.it/32x32",
        "age": 40,
        "eyeColor": "blue",
        "name": "Davenport Tran",
        "gender": "male",
        "company": "GENESYNK",
        "email": "davenporttran@genesynk.com",
        "phone": "+1 (942) 563-3587",
        "address": "281 Cortelyou Road, Statenville, Maine, 812",
        "about": "Eu mollit in pariatur amet pariatur. Duis voluptate sit ex minim consectetur. Enim exercitation aliqua deserunt mollit aute velit cupidatat.\r\n",
        "registered": "2014-07-19T12:04:47 -03:00",
        "latitude": 30.20043,
        "longitude": 171.210739,
        "tags": [
            "magna",
            "sit",
            "anim",
            "tempor",
            "ipsum",
            "laboris"
        ],
        "friends": [
            {
                "id": 0,
                "name": "Nash Kline"
            },
            {
                "id": 1,
                "name": "Colette Obrien"
            },
            {
                "id": 2,
                "name": "Mandy Barry"
            }
        ],
        "greeting": "Hello, Davenport Tran! You have 2 unread messages.",
        "favoriteFruit": "banana"
    },
    {
        "_id": "567eb18127e937f26e4945c7",
        "index": 27,
        "guid": "2291e3c1-4da9-436a-a933-25a17f6ec3d5",
        "isActive": false,
        "balance": "$2,476.84",
        "picture": "http://placehold.it/32x32",
        "age": 37,
        "eyeColor": "green",
        "name": "Lourdes Wilder",
        "gender": "female",
        "company": "EXOTECHNO",
        "email": "lourdeswilder@exotechno.com",
        "phone": "+1 (865) 576-2297",
        "address": "502 Scholes Street, Westmoreland, Nevada, 3946",
        "about": "Dolor sunt nisi quis proident mollit amet pariatur aute. Et laborum minim labore cupidatat laboris ipsum. Nostrud minim in velit non consequat. Aliqua cillum ex proident commodo. Laborum minim consectetur aliquip est qui culpa.\r\n",
        "registered": "2014-09-14T05:25:45 -03:00",
        "latitude": -20.620918,
        "longitude": 9.56388,
        "tags": [
            "et",
            "mollit",
            "nisi"
        ],
        "friends": [
            {
                "id": 0,
                "name": "Brewer Frazier"
            },
            {
                "id": 1,
                "name": "Chapman Murray"
            },
            {
                "id": 2,
                "name": "Morgan Stark"
            }
        ],
        "greeting": "Hello, Lourdes Wilder! You have 2 unread messages.",
        "favoriteFruit": "melon"
    },
    {
        "_id": "567eb181497c0f2145aa5300",
        "index": 28,
        "guid": "277296d2-b02a-4026-8629-070fdcb15d25",
        "isActive": true,
        "balance": "$2,952.88",
        "picture": "http://placehold.it/32x32",
        "age": 39,
        "eyeColor": "brown",
        "name": "Jensen Bentley",
        "gender": "male",
        "company": "AQUAMATE",
        "email": "jensenbentley@aquamate.com",
        "phone": "+1 (915) 482-3533",
        "address": "359 Bradford Street, Wacissa, South Dakota, 1645",
        "about": "Proident nostrud quis nisi cupidatat veniam duis tempor irure enim sit consequat ad. Pariatur laboris incididunt voluptate minim aliqua esse ea. Amet veniam proident officia nisi ea eiusmod sit exercitation nulla do cupidatat.\r\n",
        "registered": "2014-06-29T03:13:27 -03:00",
        "latitude": 78.830343,
        "longitude": -118.247577,
        "tags": [
            "est",
            "amet",
            "reprehenderit",
            "duis",
            "id",
            "enim",
            "et"
        ],
        "friends": [
            {
                "id": 0,
                "name": "Helene Jimenez"
            },
            {
                "id": 1,
                "name": "Baldwin Beck"
            },
            {
                "id": 2,
                "name": "Mckee Little"
            }
        ],
        "greeting": "Hello, Jensen Bentley! You have 3 unread messages.",
        "favoriteFruit": "banana"
    },
    {
        "_id": "567eb181f5d3e59baa0ede25",
        "index": 29,
        "guid": "70e4ecd7-9421-4043-9d1e-f99eea5dda3a",
        "isActive": true,
        "balance": "$1,755.76",
        "picture": "http://placehold.it/32x32",
        "age": 21,
        "eyeColor": "brown",
        "name": "Mccall Delaney",
        "gender": "male",
        "company": "OCEANICA",
        "email": "mccalldelaney@oceanica.com",
        "phone": "+1 (885) 473-2963",
        "address": "108 Batchelder Street, Bynum, Iowa, 3875",
        "about": "Mollit minim veniam laboris irure elit occaecat id pariatur minim laboris aliqua officia do. Enim culpa nisi eu veniam sint sunt sunt proident pariatur. Ea sunt enim incididunt duis nostrud consequat id fugiat esse minim labore Lorem deserunt elit.\r\n",
        "registered": "2015-10-24T01:28:11 -03:00",
        "latitude": -63.296914,
        "longitude": 154.212785,
        "tags": [
            "fugiat",
            "nisi",
            "ut",
            "qui"
        ],
        "friends": [
            {
                "id": 0,
                "name": "Kellie Blackburn"
            },
            {
                "id": 1,
                "name": "Pope Fischer"
            },
            {
                "id": 2,
                "name": "Kennedy West"
            }
        ],
        "greeting": "Hello, Mccall Delaney! You have 5 unread messages.",
        "favoriteFruit": "strawberry"
    },
    {
        "_id": "567eb1812573f998947690f8",
        "index": 30,
        "guid": "9548e99c-7234-4214-9966-b27275f96bc6",
        "isActive": false,
        "balance": "$3,501.14",
        "picture": "http://placehold.it/32x32",
        "age": 38,
        "eyeColor": "blue",
        "name": "Hall Dudley",
        "gender": "male",
        "company": "DIGIGEN",
        "email": "halldudley@digigen.com",
        "phone": "+1 (957) 445-3675",
        "address": "483 Garden Place, Coral, Oklahoma, 5515",
        "about": "Aliquip cillum minim cillum eiusmod duis voluptate esse cupidatat elit anim et. Cupidatat do enim ea quis amet laboris quis eu. Officia sint proident enim enim nostrud do est deserunt amet occaecat in id. Fugiat aliquip eiusmod est id ipsum dolor culpa nulla dolore. Id ullamco ipsum labore aliqua do laborum qui veniam adipisicing sint nostrud aute.\r\n",
        "registered": "2015-04-18T04:06:42 -03:00",
        "latitude": 59.114565,
        "longitude": -98.977694,
        "tags": [
            "reprehenderit",
            "in",
            "sunt",
            "deserunt",
            "qui",
            "laboris",
            "Lorem"
        ],
        "friends": [
            {
                "id": 0,
                "name": "Lara Rivas"
            },
            {
                "id": 1,
                "name": "Chen Brown"
            },
            {
                "id": 2,
                "name": "Fitzgerald Wood"
            }
        ],
        "greeting": "Hello, Hall Dudley! You have 4 unread messages.",
        "favoriteFruit": "apple"
    },
    {
        "_id": "567eb1810007a9568beff818",
        "index": 31,
        "guid": "b69f7da6-7cc4-435d-ba9d-32ad462e5020",
        "isActive": false,
        "balance": "$1,143.03",
        "picture": "http://placehold.it/32x32",
        "age": 31,
        "eyeColor": "brown",
        "name": "Megan Hancock",
        "gender": "female",
        "company": "ZIDANT",
        "email": "meganhancock@zidant.com",
        "phone": "+1 (969) 412-2301",
        "address": "989 Brighton Avenue, Brownlee, New Mexico, 6294",
        "about": "Amet ipsum adipisicing Lorem amet quis consequat est duis minim id. Ea et cillum esse nisi nostrud veniam. Fugiat reprehenderit fugiat anim anim.\r\n",
        "registered": "2014-09-05T07:42:37 -03:00",
        "latitude": 70.938143,
        "longitude": 5.018297,
        "tags": [
            "do",
            "consectetur",
            "consectetur",
            "qui",
            "reprehenderit"
        ],
        "friends": [
            {
                "id": 0,
                "name": "Anthony Nguyen"
            },
            {
                "id": 1,
                "name": "Casey Boyle"
            },
            {
                "id": 2,
                "name": "Chase Sykes"
            }
        ],
        "greeting": "Hello, Megan Hancock! You have 2 unread messages.",
        "favoriteFruit": "strawberry"
    },
    {
        "_id": "567eb181f88691ba5bb75a9a",
        "index": 32,
        "guid": "af48fc8c-f62d-4af3-8053-130785fa82ab",
        "isActive": true,
        "balance": "$3,576.33",
        "picture": "http://placehold.it/32x32",
        "age": 35,
        "eyeColor": "brown",
        "name": "Horn Perkins",
        "gender": "male",
        "company": "MELBACOR",
        "email": "hornperkins@melbacor.com",
        "phone": "+1 (888) 490-2216",
        "address": "950 Georgia Avenue, Rosedale, Virgin Islands, 7110",
        "about": "Proident non voluptate duis ipsum. In incididunt aliquip cupidatat deserunt in ullamco in et laboris velit tempor adipisicing. Ex elit magna occaecat nisi esse officia in deserunt laboris. Voluptate ut velit enim amet deserunt sit. Fugiat duis consequat irure tempor.\r\n",
        "registered": "2014-03-26T06:09:39 -02:00",
        "latitude": -25.090194,
        "longitude": 26.106031,
        "tags": [
            "irure",
            "ut",
            "ipsum",
            "fugiat",
            "magna"
        ],
        "friends": [
            {
                "id": 0,
                "name": "Mathews Middleton"
            },
            {
                "id": 1,
                "name": "Claire Hewitt"
            },
            {
                "id": 2,
                "name": "Buck Nicholson"
            }
        ],
        "greeting": "Hello, Horn Perkins! You have 4 unread messages.",
        "favoriteFruit": "melon"
    },
    {
        "_id": "567eb181d6a6064f18bb982c",
        "index": 33,
        "guid": "25e1841e-0f28-497c-b835-58e3e0bac8dd",
        "isActive": true,
        "balance": "$1,311.49",
        "picture": "http://placehold.it/32x32",
        "age": 23,
        "eyeColor": "green",
        "name": "Wilma Robertson",
        "gender": "female",
        "company": "VANTAGE",
        "email": "wilmarobertson@vantage.com",
        "phone": "+1 (833) 406-2750",
        "address": "580 Chestnut Avenue, Brogan, Arizona, 8406",
        "about": "Cupidatat culpa velit labore ut laboris. Voluptate enim laboris incididunt ut sunt ex incididunt deserunt irure consectetur quis. Reprehenderit sunt velit velit adipisicing consectetur dolore Lorem. Enim quis veniam laborum do enim in nisi mollit dolor. Labore esse enim do non laborum duis magna in exercitation eu mollit est. Consequat aliquip elit irure aliquip anim in. Quis sunt nisi irure cupidatat id tempor ullamco elit.\r\n",
        "registered": "2015-05-29T08:28:30 -03:00",
        "latitude": 54.358384,
        "longitude": -174.546631,
        "tags": [
            "elit",
            "dolore",
            "labore"
        ],
        "friends": [
            {
                "id": 0,
                "name": "Elva Mays"
            },
            {
                "id": 1,
                "name": "Josie Daniels"
            },
            {
                "id": 2,
                "name": "Branch Holcomb"
            }
        ],
        "greeting": "Hello, Wilma Robertson! You have 10 unread messages.",
        "favoriteFruit": "banana"
    },
    {
        "_id": "567eb1815c8341b6a0bcbb27",
        "index": 34,
        "guid": "2b68efc7-fce1-4fb5-8f04-33d7628d4029",
        "isActive": false,
        "balance": "$2,703.61",
        "picture": "http://placehold.it/32x32",
        "age": 30,
        "eyeColor": "blue",
        "name": "Dionne Puckett",
        "gender": "female",
        "company": "BRISTO",
        "email": "dionnepuckett@bristo.com",
        "phone": "+1 (976) 530-2679",
        "address": "400 Suydam Place, Savannah, New Hampshire, 7079",
        "about": "Culpa tempor veniam elit velit sit ea ea. Mollit ex nostrud pariatur mollit reprehenderit id adipisicing duis cupidatat ex. Ex et Lorem aute et dolor quis do consectetur Lorem quis ipsum magna mollit occaecat. Pariatur mollit culpa incididunt officia ea nostrud dolor fugiat elit. Duis deserunt deserunt enim amet tempor.\r\n",
        "registered": "2015-04-17T09:17:05 -03:00",
        "latitude": 3.218732,
        "longitude": -57.698194,
        "tags": [
            "do",
            "duis",
            "qui",
            "est"
        ],
        "friends": [
            {
                "id": 0,
                "name": "Lawrence Gates"
            },
            {
                "id": 1,
                "name": "Pugh Malone"
            },
            {
                "id": 2,
                "name": "Mckenzie Combs"
            }
        ],
        "greeting": "Hello, Dionne Puckett! You have 10 unread messages.",
        "favoriteFruit": "apple"
    },
    {
        "_id": "567eb1812cad8deb883bdbe0",
        "index": 35,
        "guid": "035e2bbb-3092-4295-906d-d49996b30158",
        "isActive": false,
        "balance": "$1,608.65",
        "picture": "http://placehold.it/32x32",
        "age": 39,
        "eyeColor": "blue",
        "name": "Ethel Velazquez",
        "gender": "female",
        "company": "DECRATEX",
        "email": "ethelvelazquez@decratex.com",
        "phone": "+1 (871) 449-3007",
        "address": "747 Court Street, Kempton, Michigan, 3131",
        "about": "Reprehenderit duis nostrud eu amet exercitation enim ad voluptate sint deserunt irure. Ex nostrud officia exercitation tempor deserunt ipsum velit sunt non irure do tempor. Magna aliquip dolor ex cillum reprehenderit fugiat ad irure culpa. Laborum tempor ea adipisicing cillum dolore cupidatat magna. Officia qui proident enim laboris anim. Laborum dolore officia tempor laboris minim ea non. Irure aliqua veniam nisi cillum non.\r\n",
        "registered": "2015-07-12T02:29:42 -03:00",
        "latitude": -42.281167,
        "longitude": 108.48549,
        "tags": [
            "amet",
            "do",
            "eu",
            "in"
        ],
        "friends": [
            {
                "id": 0,
                "name": "Montoya Byrd"
            },
            {
                "id": 1,
                "name": "Vinson Pugh"
            },
            {
                "id": 2,
                "name": "Mercado Witt"
            }
        ],
        "greeting": "Hello, Ethel Velazquez! You have 2 unread messages.",
        "favoriteFruit": "strawberry"
    },
    {
        "_id": "567eb181d5816ec166aba195",
        "index": 36,
        "guid": "1fa86bd5-1edd-46d3-bfe8-23b55648c481",
        "isActive": true,
        "balance": "$1,802.44",
        "picture": "http://placehold.it/32x32",
        "age": 34,
        "eyeColor": "green",
        "name": "Morrow Sims",
        "gender": "male",
        "company": "NEBULEAN",
        "email": "morrowsims@nebulean.com",
        "phone": "+1 (991) 558-3035",
        "address": "682 Farragut Road, Beaverdale, Mississippi, 5446",
        "about": "Velit sint anim nulla commodo. Elit nulla ex commodo ipsum sunt esse laborum eiusmod adipisicing veniam. Voluptate non occaecat consectetur sunt do. Ex Lorem minim ipsum id cillum irure dolor cillum reprehenderit consectetur sit. Pariatur amet aliquip incididunt non esse consectetur exercitation. Eu dolore velit aliquip aliqua incididunt eiusmod veniam enim fugiat enim aute dolor. Fugiat fugiat cillum ea elit culpa aute occaecat voluptate quis consectetur tempor mollit.\r\n",
        "registered": "2015-02-25T05:56:54 -02:00",
        "latitude": 3.957378,
        "longitude": -62.385807,
        "tags": [
            "qui",
            "laboris",
            "non",
            "occaecat",
            "Lorem",
            "do"
        ],
        "friends": [
            {
                "id": 0,
                "name": "Angelina Newman"
            },
            {
                "id": 1,
                "name": "Barlow Riley"
            },
            {
                "id": 2,
                "name": "Nola Slater"
            }
        ],
        "greeting": "Hello, Morrow Sims! You have 2 unread messages.",
        "favoriteFruit": "apple"
    },
    {
        "_id": "567eb181b3abbe9016f8d564",
        "index": 37,
        "guid": "9667b6d6-9b54-4c03-88e6-d0de9a737cac",
        "isActive": false,
        "balance": "$2,008.88",
        "picture": "http://placehold.it/32x32",
        "age": 26,
        "eyeColor": "blue",
        "name": "Kris Terry",
        "gender": "female",
        "company": "XEREX",
        "email": "kristerry@xerex.com",
        "phone": "+1 (962) 511-3560",
        "address": "396 Hoyts Lane, Warsaw, Texas, 520",
        "about": "Do tempor pariatur nostrud sit deserunt magna nostrud. Culpa in ipsum excepteur fugiat pariatur non ad sint nisi non nulla. Qui amet ad velit id reprehenderit Lorem qui ex pariatur exercitation consequat sunt quis. Incididunt eu proident voluptate adipisicing reprehenderit velit non irure duis dolore. Commodo fugiat Lorem quis irure occaecat officia tempor velit deserunt fugiat cupidatat cillum quis ea. Minim dolore duis voluptate qui est cillum cillum.\r\n",
        "registered": "2014-05-14T03:45:10 -03:00",
        "latitude": 87.229183,
        "longitude": -14.86931,
        "tags": [
            "deserunt",
            "consectetur",
            "non",
            "occaecat",
            "aliqua"
        ],
        "friends": [
            {
                "id": 0,
                "name": "Patrice Summers"
            },
            {
                "id": 1,
                "name": "Corina Chase"
            },
            {
                "id": 2,
                "name": "Greene Steele"
            }
        ],
        "greeting": "Hello, Kris Terry! You have 1 unread messages.",
        "favoriteFruit": "apple"
    },
    {
        "_id": "567eb181bacbaf1915fddb38",
        "index": 38,
        "guid": "529b8d6b-b049-4309-869e-fd6968d3b8a3",
        "isActive": true,
        "balance": "$1,166.97",
        "picture": "http://placehold.it/32x32",
        "age": 30,
        "eyeColor": "green",
        "name": "Parsons Whitney",
        "gender": "male",
        "company": "VALPREAL",
        "email": "parsonswhitney@valpreal.com",
        "phone": "+1 (982) 488-3656",
        "address": "989 Dorchester Road, Iola, Palau, 2430",
        "about": "Non sunt quis laboris do exercitation eiusmod pariatur commodo id nostrud. Ea est velit ea adipisicing deserunt. Nostrud in cillum ipsum tempor officia cupidatat.\r\n",
        "registered": "2014-02-26T04:22:54 -02:00",
        "latitude": 26.236638,
        "longitude": 154.456337,
        "tags": [
            "nostrud",
            "aliquip",
            "dolore",
            "est",
            "sunt",
            "qui"
        ],
        "friends": [
            {
                "id": 0,
                "name": "Diane Randolph"
            },
            {
                "id": 1,
                "name": "Ellis Kerr"
            },
            {
                "id": 2,
                "name": "Rios Forbes"
            }
        ],
        "greeting": "Hello, Parsons Whitney! You have 4 unread messages.",
        "favoriteFruit": "strawberry"
    },
    {
        "_id": "567eb1816c9ffdf7d10f0215",
        "index": 39,
        "guid": "6b2815cc-1879-41d8-b70c-133b097d12cd",
        "isActive": false,
        "balance": "$1,460.05",
        "picture": "http://placehold.it/32x32",
        "age": 40,
        "eyeColor": "blue",
        "name": "Charles Black",
        "gender": "male",
        "company": "SILODYNE",
        "email": "charlesblack@silodyne.com",
        "phone": "+1 (923) 478-2760",
        "address": "974 Stratford Road, Freetown, New Jersey, 2220",
        "about": "Nostrud enim non occaecat minim cupidatat. Ad do adipisicing aliquip cillum sunt. Ex cupidatat enim officia aute excepteur cupidatat veniam magna do in. Commodo tempor velit sunt in sunt aliqua irure sunt.\r\n",
        "registered": "2014-05-16T12:09:53 -03:00",
        "latitude": 47.276476,
        "longitude": -54.990668,
        "tags": [
            "est",
            "minim",
            "in"
        ],
        "friends": [
            {
                "id": 0,
                "name": "Malone Mejia"
            },
            {
                "id": 1,
                "name": "Johanna Peters"
            },
            {
                "id": 2,
                "name": "Valarie Powers"
            }
        ],
        "greeting": "Hello, Charles Black! You have 7 unread messages.",
        "favoriteFruit": "apple"
    },
    {
        "_id": "567eb1811abf831f2c801274",
        "index": 40,
        "guid": "910ea73b-42a1-49a5-ab93-386e3e0c301a",
        "isActive": false,
        "balance": "$2,954.89",
        "picture": "http://placehold.it/32x32",
        "age": 37,
        "eyeColor": "brown",
        "name": "Davidson Huber",
        "gender": "male",
        "company": "XURBAN",
        "email": "davidsonhuber@xurban.com",
        "phone": "+1 (979) 575-3289",
        "address": "605 Manhattan Court, Delwood, Connecticut, 3769",
        "about": "In ipsum magna esse et eu fugiat in. Id ea laboris aliqua qui voluptate labore occaecat voluptate ad ex. Nulla nostrud ullamco nulla consectetur ullamco ullamco qui ex ullamco laboris excepteur. Magna culpa amet est laborum. Quis non voluptate dolor id. Aute amet nulla excepteur sit officia eiusmod. Id incididunt in dolor eiusmod anim minim sit sit.\r\n",
        "registered": "2014-04-29T05:28:23 -03:00",
        "latitude": -17.277674,
        "longitude": -75.484231,
        "tags": [
            "magna",
            "nisi",
            "ea",
            "nostrud",
            "nostrud"
        ],
        "friends": [
            {
                "id": 0,
                "name": "Vang Joyce"
            },
            {
                "id": 1,
                "name": "Veronica Jefferson"
            },
            {
                "id": 2,
                "name": "Sheryl Henderson"
            }
        ],
        "greeting": "Hello, Davidson Huber! You have 1 unread messages.",
        "favoriteFruit": "apple"
    },
    {
        "_id": "567eb18117174992909d86ee",
        "index": 41,
        "guid": "8c1e8db3-c3ab-4626-b662-c3be0365e29a",
        "isActive": false,
        "balance": "$1,146.15",
        "picture": "http://placehold.it/32x32",
        "age": 24,
        "eyeColor": "green",
        "name": "Beck Hardin",
        "gender": "male",
        "company": "RODEMCO",
        "email": "beckhardin@rodemco.com",
        "phone": "+1 (829) 438-3493",
        "address": "934 Bayview Place, Staples, Massachusetts, 5528",
        "about": "Commodo anim duis dolor mollit pariatur officia amet. Ex reprehenderit in ut ipsum in excepteur deserunt incididunt. Elit eu amet dolore deserunt quis qui culpa. Eiusmod dolor aliquip ut aute duis et cillum in esse id sunt deserunt labore. Officia culpa magna sint ex minim magna excepteur duis est consequat reprehenderit irure tempor. Nostrud irure ex adipisicing qui minim labore qui laborum.\r\n",
        "registered": "2015-09-14T03:30:42 -03:00",
        "latitude": -11.476534,
        "longitude": 9.485316,
        "tags": [
            "ea",
            "eu",
            "nostrud",
            "labore",
            "deserunt",
            "ut",
            "cillum"
        ],
        "friends": [
            {
                "id": 0,
                "name": "Navarro Gillespie"
            },
            {
                "id": 1,
                "name": "Hopper Cummings"
            },
            {
                "id": 2,
                "name": "Lacy Landry"
            }
        ],
        "greeting": "Hello, Beck Hardin! You have 3 unread messages.",
        "favoriteFruit": "apple"
    },
    {
        "_id": "567eb18150183f401b7bf7a8",
        "index": 42,
        "guid": "a5179bb1-7dce-4cb7-b496-3c3517b4601c",
        "isActive": true,
        "balance": "$3,895.85",
        "picture": "http://placehold.it/32x32",
        "age": 40,
        "eyeColor": "green",
        "name": "Minnie Hammond",
        "gender": "female",
        "company": "GOLISTIC",
        "email": "minniehammond@golistic.com",
        "phone": "+1 (981) 465-3322",
        "address": "830 Harrison Place, Bloomington, Idaho, 9239",
        "about": "Deserunt eiusmod voluptate aliquip magna esse ad fugiat velit proident ex. Laborum pariatur fugiat magna laborum velit excepteur fugiat amet laborum qui irure deserunt. Exercitation Lorem ullamco est sit irure anim. Id non pariatur cupidatat mollit tempor fugiat aute fugiat fugiat commodo duis. Commodo laboris dolore non Lorem veniam anim nostrud. Excepteur veniam fugiat reprehenderit pariatur nulla consequat esse incididunt irure ea labore ipsum.\r\n",
        "registered": "2015-06-02T12:35:51 -03:00",
        "latitude": -54.268889,
        "longitude": -115.180638,
        "tags": [
            "anim",
            "et",
            "dolore",
            "Lorem",
            "eu"
        ],
        "friends": [
            {
                "id": 0,
                "name": "Munoz Payne"
            },
            {
                "id": 1,
                "name": "Claudia Sandoval"
            },
            {
                "id": 2,
                "name": "Wolf Mcmillan"
            }
        ],
        "greeting": "Hello, Minnie Hammond! You have 3 unread messages.",
        "favoriteFruit": "melon"
    },
    {
        "_id": "567eb18199d8b45599b2e3aa",
        "index": 43,
        "guid": "d766849c-5a2e-41c3-a49c-cebcfd26fd60",
        "isActive": true,
        "balance": "$3,209.46",
        "picture": "http://placehold.it/32x32",
        "age": 38,
        "eyeColor": "brown",
        "name": "Patsy Rosa",
        "gender": "female",
        "company": "BUZZMAKER",
        "email": "patsyrosa@buzzmaker.com",
        "phone": "+1 (978) 427-3145",
        "address": "178 Quincy Street, Vaughn, New York, 8440",
        "about": "Ipsum enim aute ullamco velit tempor ullamco est elit veniam. Non tempor minim aliqua nulla eu commodo ullamco aute laboris exercitation ipsum in. Qui ea eiusmod aliquip cupidatat esse incididunt occaecat reprehenderit. Amet eu consequat Lorem amet veniam veniam fugiat fugiat voluptate nostrud aliqua. Officia nisi aute dolor ad aliquip. Sint est aliqua voluptate sit quis fugiat officia fugiat ullamco duis laboris eu qui. Eiusmod est sint qui amet laboris labore magna dolor esse sunt officia.\r\n",
        "registered": "2014-06-25T12:42:31 -03:00",
        "latitude": -85.492579,
        "longitude": 11.493905,
        "tags": [
            "enim",
            "voluptate",
            "sint",
            "exercitation",
            "magna"
        ],
        "friends": [
            {
                "id": 0,
                "name": "Brandy Horn"
            },
            {
                "id": 1,
                "name": "Reyna Dominguez"
            },
            {
                "id": 2,
                "name": "Glass Ashley"
            }
        ],
        "greeting": "Hello, Patsy Rosa! You have 6 unread messages.",
        "favoriteFruit": "apple"
    },
    {
        "_id": "567eb18195e638d269ea2463",
        "index": 44,
        "guid": "794481a2-94dd-4c86-a622-a89084410bad",
        "isActive": false,
        "balance": "$3,291.11",
        "picture": "http://placehold.it/32x32",
        "age": 28,
        "eyeColor": "blue",
        "name": "Berry Boone",
        "gender": "male",
        "company": "HOMELUX",
        "email": "berryboone@homelux.com",
        "phone": "+1 (937) 449-3987",
        "address": "610 Jaffray Street, Southmont, Nebraska, 4399",
        "about": "Aute irure culpa duis laborum aliqua ex. Occaecat aliquip excepteur sint deserunt officia reprehenderit commodo incididunt. Consectetur enim aliqua eiusmod ad magna fugiat eiusmod pariatur voluptate.\r\n",
        "registered": "2014-07-09T08:54:25 -03:00",
        "latitude": -43.300075,
        "longitude": 33.676153,
        "tags": [
            "fugiat",
            "excepteur",
            "irure",
            "excepteur",
            "elit"
        ],
        "friends": [
            {
                "id": 0,
                "name": "Tonia Contreras"
            },
            {
                "id": 1,
                "name": "Winnie Schwartz"
            },
            {
                "id": 2,
                "name": "Allyson Battle"
            }
        ],
        "greeting": "Hello, Berry Boone! You have 5 unread messages.",
        "favoriteFruit": "banana"
    },
    {
        "_id": "567eb181d55aee12b7d5b163",
        "index": 45,
        "guid": "30425403-489f-408b-8347-30b69a8aa452",
        "isActive": false,
        "balance": "$3,319.44",
        "picture": "http://placehold.it/32x32",
        "age": 33,
        "eyeColor": "green",
        "name": "Mavis Curry",
        "gender": "female",
        "company": "NORSUP",
        "email": "maviscurry@norsup.com",
        "phone": "+1 (945) 479-3014",
        "address": "334 Bryant Street, Lumberton, Rhode Island, 1763",
        "about": "Ipsum Lorem irure in sunt aute ex do commodo adipisicing elit. Qui fugiat commodo tempor dolore cupidatat adipisicing non eiusmod adipisicing velit eu commodo adipisicing. Incididunt irure non ad excepteur aliqua voluptate laborum consectetur id fugiat mollit irure voluptate est. Occaecat nulla fugiat nulla magna deserunt amet reprehenderit. Aliqua sunt veniam magna minim exercitation sunt enim exercitation incididunt tempor. Magna id elit pariatur magna minim culpa velit do officia reprehenderit consequat culpa. Excepteur culpa esse nulla dolore incididunt culpa dolore et duis adipisicing irure.\r\n",
        "registered": "2015-08-22T06:46:08 -03:00",
        "latitude": 45.857892,
        "longitude": 22.848958,
        "tags": [
            "minim",
            "ut",
            "pariatur",
            "ullamco",
            "cupidatat"
        ],
        "friends": [
            {
                "id": 0,
                "name": "Dena Walter"
            },
            {
                "id": 1,
                "name": "Cote May"
            },
            {
                "id": 2,
                "name": "Hamilton Mcleod"
            }
        ],
        "greeting": "Hello, Mavis Curry! You have 10 unread messages.",
        "favoriteFruit": "strawberry"
    },
    {
        "_id": "567eb18162a4c6a204f76b56",
        "index": 46,
        "guid": "84338633-94ff-43e6-8a03-9f5bdaff0124",
        "isActive": true,
        "balance": "$3,394.74",
        "picture": "http://placehold.it/32x32",
        "age": 28,
        "eyeColor": "blue",
        "name": "Waller Hickman",
        "gender": "male",
        "company": "XANIDE",
        "email": "wallerhickman@xanide.com",
        "phone": "+1 (924) 587-3225",
        "address": "965 Hicks Street, Navarre, North Carolina, 3848",
        "about": "Sint id irure velit non sint fugiat voluptate dolore exercitation exercitation consectetur incididunt. Elit nulla cupidatat quis ipsum veniam velit minim velit eu nisi amet. Anim sit enim laborum enim sit veniam excepteur.\r\n",
        "registered": "2015-06-28T02:25:16 -03:00",
        "latitude": 71.557339,
        "longitude": 108.945443,
        "tags": [
            "in",
            "consequat",
            "dolore",
            "officia"
        ],
        "friends": [
            {
                "id": 0,
                "name": "Pam Head"
            },
            {
                "id": 1,
                "name": "Traci Collins"
            },
            {
                "id": 2,
                "name": "Cleo Talley"
            }
        ],
        "greeting": "Hello, Waller Hickman! You have 2 unread messages.",
        "favoriteFruit": "apple"
    },
    {
        "_id": "567eb181a8e7128eb9c08404",
        "index": 47,
        "guid": "306e1c03-1a3c-4f0e-bf95-626a5deb672e",
        "isActive": false,
        "balance": "$3,733.89",
        "picture": "http://placehold.it/32x32",
        "age": 30,
        "eyeColor": "blue",
        "name": "Malinda Vaughn",
        "gender": "female",
        "company": "ONTAGENE",
        "email": "malindavaughn@ontagene.com",
        "phone": "+1 (965) 554-3577",
        "address": "484 Lake Street, Stockwell, American Samoa, 2443",
        "about": "Exercitation nisi est dolor nostrud duis voluptate laborum. Aute eu sunt ut dolor commodo eiusmod eiusmod deserunt eu. Consectetur anim aliqua anim laboris eu amet magna excepteur minim id proident pariatur. Culpa esse ut laboris tempor aute aliqua amet aliquip reprehenderit adipisicing officia anim.\r\n",
        "registered": "2014-09-23T02:50:30 -03:00",
        "latitude": 78.068172,
        "longitude": 79.89673,
        "tags": [
            "duis",
            "labore",
            "enim",
            "sunt",
            "est"
        ],
        "friends": [
            {
                "id": 0,
                "name": "Dunn Morrow"
            },
            {
                "id": 1,
                "name": "Evangelina Buckner"
            },
            {
                "id": 2,
                "name": "Lelia Pate"
            }
        ],
        "greeting": "Hello, Malinda Vaughn! You have 6 unread messages.",
        "favoriteFruit": "apple"
    },
    {
        "_id": "567eb181d0ab933da6765b0d",
        "index": 48,
        "guid": "6cd17f4c-0ac8-47e3-bf01-eb03b2d77c80",
        "isActive": true,
        "balance": "$1,658.98",
        "picture": "http://placehold.it/32x32",
        "age": 29,
        "eyeColor": "green",
        "name": "Lindsay Mcgowan",
        "gender": "female",
        "company": "POLARIA",
        "email": "lindsaymcgowan@polaria.com",
        "phone": "+1 (820) 545-3102",
        "address": "696 Nichols Avenue, Motley, Virginia, 4697",
        "about": "Dolor aliquip sint ea elit aute irure officia proident. Tempor dolor qui enim sit est ex quis Lorem. Lorem ullamco ex qui quis minim sint eiusmod qui laborum commodo eiusmod. In amet eu fugiat non veniam.\r\n",
        "registered": "2015-07-19T11:55:37 -03:00",
        "latitude": 42.749742,
        "longitude": -137.094393,
        "tags": [
            "ipsum",
            "do",
            "minim",
            "commodo",
            "do",
            "aliquip",
            "irure"
        ],
        "friends": [
            {
                "id": 0,
                "name": "Ester Browning"
            },
            {
                "id": 1,
                "name": "Boyer Chapman"
            },
            {
                "id": 2,
                "name": "Wise Mason"
            }
        ],
        "greeting": "Hello, Lindsay Mcgowan! You have 4 unread messages.",
        "favoriteFruit": "apple"
    },
    {
        "_id": "567eb181c28566ef16fa71cf",
        "index": 49,
        "guid": "ecb435b2-9f15-4aa4-970f-42546a6ae9b6",
        "isActive": false,
        "balance": "$3,396.29",
        "picture": "http://placehold.it/32x32",
        "age": 31,
        "eyeColor": "green",
        "name": "Alvarado Dean",
        "gender": "male",
        "company": "AQUAFIRE",
        "email": "alvaradodean@aquafire.com",
        "phone": "+1 (891) 402-2149",
        "address": "388 Dakota Place, Cumminsville, District Of Columbia, 5868",
        "about": "Consectetur dolor laboris non nulla dolor. Veniam eu enim ipsum sunt quis duis. Nulla Lorem consectetur eiusmod anim labore labore elit incididunt exercitation eu cillum nulla irure. Aute enim sint excepteur exercitation qui in et consequat et sint tempor. Culpa reprehenderit aliqua in culpa sit velit. Id proident reprehenderit et nisi culpa sint velit est.\r\n",
        "registered": "2014-03-31T04:57:56 -03:00",
        "latitude": -24.571684,
        "longitude": 25.667336,
        "tags": [
            "laboris",
            "enim",
            "incididunt",
            "ad",
            "voluptate"
        ],
        "friends": [
            {
                "id": 0,
                "name": "Lorna Osborne"
            },
            {
                "id": 1,
                "name": "Rasmussen Francis"
            },
            {
                "id": 2,
                "name": "Katherine Sexton"
            }
        ],
        "greeting": "Hello, Alvarado Dean! You have 9 unread messages.",
        "favoriteFruit": "apple"
    },
    {
        "_id": "567eb1817e4e9abf697faf73",
        "index": 50,
        "guid": "6a6d1a96-0c93-48d8-a08a-33a5d1cbbdcd",
        "isActive": false,
        "balance": "$2,945.78",
        "picture": "http://placehold.it/32x32",
        "age": 22,
        "eyeColor": "green",
        "name": "Benson Davenport",
        "gender": "male",
        "company": "ZILLANET",
        "email": "bensondavenport@zillanet.com",
        "phone": "+1 (908) 492-3670",
        "address": "211 Emerald Street, Oberlin, Maryland, 7459",
        "about": "Incididunt excepteur nostrud qui anim in anim non nisi mollit adipisicing et est sit aliqua. In ad eiusmod sunt consectetur dolore eu. Elit aute quis ea proident qui aliquip eiusmod do. Ipsum quis consectetur elit id. Minim labore ex velit mollit nostrud Lorem esse minim non ullamco. Mollit esse enim anim duis minim cupidatat cupidatat enim. Adipisicing deserunt in ut magna Lorem magna amet.\r\n",
        "registered": "2015-02-12T10:01:30 -02:00",
        "latitude": 61.874148,
        "longitude": 69.131638,
        "tags": [
            "dolor",
            "non",
            "culpa",
            "commodo",
            "id"
        ],
        "friends": [
            {
                "id": 0,
                "name": "Townsend Knapp"
            },
            {
                "id": 1,
                "name": "Mejia Bond"
            },
            {
                "id": 2,
                "name": "Jennifer Miranda"
            }
        ],
        "greeting": "Hello, Benson Davenport! You have 1 unread messages.",
        "favoriteFruit": "melon"
    },
    {
        "_id": "567eb1818bd41e5376b7b603",
        "index": 51,
        "guid": "ccea1aee-9921-4947-8282-94bb3a4ea7eb",
        "isActive": true,
        "balance": "$2,529.88",
        "picture": "http://placehold.it/32x32",
        "age": 33,
        "eyeColor": "green",
        "name": "Becker Jackson",
        "gender": "male",
        "company": "EQUITAX",
        "email": "beckerjackson@equitax.com",
        "phone": "+1 (894) 551-2598",
        "address": "755 Kings Place, Linwood, Missouri, 7241",
        "about": "Culpa id cupidatat laborum enim et laborum exercitation. Esse eu consequat nisi labore excepteur. Id duis voluptate commodo ut aliqua sunt occaecat labore et cupidatat consectetur aliquip magna fugiat. Fugiat quis voluptate deserunt cupidatat velit cillum nostrud sint in Lorem in. Aliqua cillum nulla esse incididunt laboris elit consequat occaecat sunt eu incididunt in incididunt sit. Dolor cillum qui qui ex tempor aute amet minim pariatur.\r\n",
        "registered": "2015-01-25T11:34:19 -02:00",
        "latitude": -57.239423,
        "longitude": -15.774771,
        "tags": [
            "officia",
            "occaecat",
            "proident",
            "ex",
            "incididunt",
            "esse",
            "id"
        ],
        "friends": [
            {
                "id": 0,
                "name": "Powers Norton"
            },
            {
                "id": 1,
                "name": "Lucinda Camacho"
            },
            {
                "id": 2,
                "name": "Cross Moody"
            }
        ],
        "greeting": "Hello, Becker Jackson! You have 3 unread messages.",
        "favoriteFruit": "strawberry"
    },
    {
        "_id": "567eb18188352e1f2ff1f01a",
        "index": 52,
        "guid": "df7b3519-c5a1-4a87-b3fb-8a7b11f3bff0",
        "isActive": true,
        "balance": "$2,010.79",
        "picture": "http://placehold.it/32x32",
        "age": 37,
        "eyeColor": "blue",
        "name": "Gross Vaughan",
        "gender": "male",
        "company": "DOGNOST",
        "email": "grossvaughan@dognost.com",
        "phone": "+1 (802) 533-3129",
        "address": "164 Orange Street, Felt, Northern Mariana Islands, 4026",
        "about": "Dolore ex eiusmod duis laboris consectetur magna. Eiusmod magna non velit dolor nulla ad. Ea ea incididunt sit laboris et tempor labore sunt excepteur velit proident qui labore aliqua. Officia ipsum reprehenderit quis cillum et. Adipisicing voluptate adipisicing ea ex laboris.\r\n",
        "registered": "2015-09-14T05:55:27 -03:00",
        "latitude": 73.439213,
        "longitude": -76.781715,
        "tags": [
            "consequat",
            "aliquip",
            "aute",
            "duis",
            "aute",
            "qui"
        ],
        "friends": [
            {
                "id": 0,
                "name": "Mayra Rich"
            },
            {
                "id": 1,
                "name": "Castillo Wright"
            },
            {
                "id": 2,
                "name": "Harrell Duncan"
            }
        ],
        "greeting": "Hello, Gross Vaughan! You have 6 unread messages.",
        "favoriteFruit": "banana"
    },
    {
        "_id": "567eb18170d14415e3a5652b",
        "index": 53,
        "guid": "9b97bb85-aa0d-4bcd-8b65-31d3f6bfb10c",
        "isActive": true,
        "balance": "$1,445.69",
        "picture": "http://placehold.it/32x32",
        "age": 34,
        "eyeColor": "green",
        "name": "King Petersen",
        "gender": "male",
        "company": "ZBOO",
        "email": "kingpetersen@zboo.com",
        "phone": "+1 (917) 449-2769",
        "address": "743 Chestnut Street, Jennings, Colorado, 5943",
        "about": "Ipsum incididunt cupidatat amet culpa id aute. Non reprehenderit eiusmod dolor ut veniam. Aute dolor elit adipisicing labore esse adipisicing. Ullamco non est dolor laboris velit adipisicing Lorem id duis laborum adipisicing. Lorem consequat eu tempor nulla in labore ut sunt magna proident mollit mollit. Aliqua enim minim velit consectetur proident minim sit est.\r\n",
        "registered": "2015-12-24T04:35:59 -02:00",
        "latitude": -2.909079,
        "longitude": 54.514073,
        "tags": [
            "laboris",
            "officia",
            "ipsum"
        ],
        "friends": [
            {
                "id": 0,
                "name": "Gentry Castaneda"
            },
            {
                "id": 1,
                "name": "Lambert Bryan"
            },
            {
                "id": 2,
                "name": "Justine Gamble"
            }
        ],
        "greeting": "Hello, King Petersen! You have 10 unread messages.",
        "favoriteFruit": "strawberry"
    },
    {
        "_id": "567eb181f213fc8c02077c86",
        "index": 54,
        "guid": "175aedc1-6200-4ed0-9b9b-4a34669d980c",
        "isActive": true,
        "balance": "$2,454.60",
        "picture": "http://placehold.it/32x32",
        "age": 24,
        "eyeColor": "green",
        "name": "Lester Frost",
        "gender": "male",
        "company": "CORIANDER",
        "email": "lesterfrost@coriander.com",
        "phone": "+1 (939) 512-2270",
        "address": "598 Seba Avenue, Tuskahoma, California, 4555",
        "about": "Et nulla occaecat anim occaecat sint tempor adipisicing laboris sint aute quis esse voluptate. Quis anim qui reprehenderit nisi irure. Mollit ad nisi sunt adipisicing commodo deserunt enim ullamco esse velit laboris reprehenderit sit mollit.\r\n",
        "registered": "2014-09-12T01:44:44 -03:00",
        "latitude": 67.133876,
        "longitude": -6.88107,
        "tags": [
            "aliquip",
            "sit",
            "cillum",
            "et",
            "incididunt"
        ],
        "friends": [
            {
                "id": 0,
                "name": "Hyde Shepherd"
            },
            {
                "id": 1,
                "name": "Weber Tate"
            },
            {
                "id": 2,
                "name": "Joyce Golden"
            }
        ],
        "greeting": "Hello, Lester Frost! You have 9 unread messages.",
        "favoriteFruit": "strawberry"
    },
    {
        "_id": "567eb18130676728a1bb0f40",
        "index": 55,
        "guid": "d54840ca-60ed-45e5-9cbb-482173bae044",
        "isActive": false,
        "balance": "$2,188.26",
        "picture": "http://placehold.it/32x32",
        "age": 26,
        "eyeColor": "blue",
        "name": "Fischer Acosta",
        "gender": "male",
        "company": "ISOLOGICS",
        "email": "fischeracosta@isologics.com",
        "phone": "+1 (927) 467-3691",
        "address": "385 Tudor Terrace, Brule, Delaware, 7171",
        "about": "Sint ex exercitation laborum excepteur id eu sunt qui occaecat do fugiat tempor. Sit ipsum voluptate ad mollit incididunt mollit ad qui ad deserunt nisi anim adipisicing. Culpa laboris reprehenderit duis adipisicing dolor nisi est id elit excepteur incididunt ipsum ipsum. Aliqua excepteur culpa fugiat quis commodo aliquip do excepteur et consectetur eu deserunt nulla nulla. Consequat et cupidatat quis do ea nisi ut Lorem cupidatat cupidatat sunt nisi duis. Nulla minim elit aliqua ut dolore irure deserunt commodo veniam cupidatat ea incididunt Lorem. Aute voluptate qui proident est voluptate dolore nulla.\r\n",
        "registered": "2014-06-18T01:34:16 -03:00",
        "latitude": -33.785119,
        "longitude": 130.422125,
        "tags": [
            "enim",
            "nostrud",
            "excepteur",
            "occaecat",
            "consequat",
            "minim",
            "ullamco"
        ],
        "friends": [
            {
                "id": 0,
                "name": "Hawkins Ochoa"
            },
            {
                "id": 1,
                "name": "Summer Mercer"
            },
            {
                "id": 2,
                "name": "Bates Terrell"
            }
        ],
        "greeting": "Hello, Fischer Acosta! You have 6 unread messages.",
        "favoriteFruit": "melon"
    },
    {
        "_id": "567eb1814c18b6dfbaac972e",
        "index": 56,
        "guid": "20ddd200-3d67-4abe-8795-0e1613d02a34",
        "isActive": false,
        "balance": "$3,656.03",
        "picture": "http://placehold.it/32x32",
        "age": 32,
        "eyeColor": "green",
        "name": "Douglas Wallace",
        "gender": "male",
        "company": "ENVIRE",
        "email": "douglaswallace@envire.com",
        "phone": "+1 (979) 575-3596",
        "address": "801 Columbia Place, Genoa, Puerto Rico, 6230",
        "about": "Ea voluptate sint commodo incididunt non nisi. Adipisicing aute duis nulla dolor tempor irure. Commodo ullamco minim est Lorem ipsum amet cupidatat occaecat duis.\r\n",
        "registered": "2014-08-08T07:01:14 -03:00",
        "latitude": 73.440627,
        "longitude": -131.712276,
        "tags": [
            "eiusmod",
            "culpa",
            "dolor",
            "aliquip",
            "tempor"
        ],
        "friends": [
            {
                "id": 0,
                "name": "Kitty Weaver"
            },
            {
                "id": 1,
                "name": "May Doyle"
            },
            {
                "id": 2,
                "name": "Jefferson Blackwell"
            }
        ],
        "greeting": "Hello, Douglas Wallace! You have 9 unread messages.",
        "favoriteFruit": "melon"
    },
    {
        "_id": "567eb181b97b1eb0e63b1f57",
        "index": 57,
        "guid": "6754bffb-c267-4ec5-bf52-b8e7bde80a84",
        "isActive": false,
        "balance": "$3,172.31",
        "picture": "http://placehold.it/32x32",
        "age": 28,
        "eyeColor": "blue",
        "name": "Ellison Calhoun",
        "gender": "male",
        "company": "POWERNET",
        "email": "ellisoncalhoun@powernet.com",
        "phone": "+1 (856) 417-2553",
        "address": "326 Merit Court, Ezel, Hawaii, 9140",
        "about": "Enim est non cillum magna incididunt incididunt nulla ullamco incididunt ea duis sint qui. Officia ut cupidatat labore mollit labore adipisicing ad. Adipisicing adipisicing Lorem deserunt occaecat adipisicing tempor aliquip. Proident do mollit tempor tempor culpa irure aliqua nostrud id ullamco officia aliqua deserunt sunt. Quis adipisicing officia qui aliquip incididunt laboris cupidatat labore. Ex officia proident deserunt qui dolore reprehenderit ut ut qui ullamco esse consectetur sit.\r\n",
        "registered": "2014-09-01T03:39:52 -03:00",
        "latitude": -19.501008,
        "longitude": -2.228903,
        "tags": [
            "elit",
            "laborum",
            "sit",
            "mollit",
            "mollit"
        ],
        "friends": [
            {
                "id": 0,
                "name": "Gayle Burgess"
            },
            {
                "id": 1,
                "name": "Neva Leblanc"
            },
            {
                "id": 2,
                "name": "Maura Newton"
            }
        ],
        "greeting": "Hello, Ellison Calhoun! You have 2 unread messages.",
        "favoriteFruit": "melon"
    },
    {
        "_id": "567eb1817147516fbbb04aa6",
        "index": 58,
        "guid": "5fa2607b-627b-4326-8a1e-4017ae0328ef",
        "isActive": true,
        "balance": "$2,026.28",
        "picture": "http://placehold.it/32x32",
        "age": 40,
        "eyeColor": "brown",
        "name": "Blake Hoffman",
        "gender": "male",
        "company": "XELEGYL",
        "email": "blakehoffman@xelegyl.com",
        "phone": "+1 (897) 544-2866",
        "address": "495 Railroad Avenue, Aguila, Louisiana, 3129",
        "about": "Mollit nisi aliquip aliquip occaecat aliquip culpa magna sunt incididunt dolore ullamco voluptate exercitation officia. Culpa labore consequat nisi dolor proident minim est. Labore eu minim quis aute in eu culpa Lorem consequat. Deserunt mollit ullamco ullamco qui tempor ea commodo irure. Ut esse aliquip occaecat in culpa officia occaecat adipisicing cupidatat est Lorem do.\r\n",
        "registered": "2015-10-24T03:58:21 -03:00",
        "latitude": 17.440766,
        "longitude": 166.407715,
        "tags": [
            "aute",
            "proident",
            "sunt",
            "deserunt"
        ],
        "friends": [
            {
                "id": 0,
                "name": "Sims Lawrence"
            },
            {
                "id": 1,
                "name": "Meghan Pittman"
            },
            {
                "id": 2,
                "name": "Lori Mcconnell"
            }
        ],
        "greeting": "Hello, Blake Hoffman! You have 4 unread messages.",
        "favoriteFruit": "melon"
    }
];

var res2 = ExamplesWithoutColts.countfavoriteFruitsFromPeopleAbove30(data);
console.log(JSON.stringify(res2));


var res3 = ExamplesWithoutColts.avarageBalancePerDecade(data);
console.log(JSON.stringify(res3));