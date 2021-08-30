export { };
// export const updateActivity: (
//     token: string,

//     actionType: string, // A konkrét cselekvés típusa például videó megtekintése, szavazás megtekintése
//     actionTriggererURL: string, // A cselekvés származási URL-je
//     actionTriggererItemName: string, // A cselekvést kiváltó elem egyedi elnevezése camelCasing-el
//     actionTriggererItemLabel: string, // A cselekvést kiváltó elem felhasználó által látható elnevezése
//     activityType: "modification" | "generalPassive" | "collBasedPassive" | "collBasedActive", // Összesen négy értéke lehet, az aktivitás típusát határozza meg.
//     description: string, // A cselekvés leírása saját szavakkal
//     sentByUser: boolean, // A felhasználó vagy a szoftver küldte a kérést

//     // BIZONYOS ESETEKBEN BÁRMELYIKHEZ KELLHET

//     actionSubject?: string, // Az action tárgya, amihez kötődik
//     actionValue?: string, //
//     collectionName?: string, // Bármelyik létező collection neve lehet.
//     groupByPropertyName?: string, // Az adott collectionben létező érték neve, például _id, name, category stb.
//     groupByPropertyValue?: string, // A groupByPropertyName-hez tartozó aktuális érték, például _id esetén: 6022c270f66f803c80243250
//     acrionTriggererItemKey?: string, // A cselekvést kiváltó elem egyedi azonosítója generált elemek esetén
//     nextStateURL?: string, // A következő oldal URL-je, ha van.
//     nextStateType?: string, // oldalmódosítás, ui módosítás,
//     nextStateValue?: string,

//     // CSAK MÓDOSÍTÁS ESETÉN KELL

//     modifiedPropertyName?: string,
//     modifiedPropertyCurrentValue?: string,
//     modifiedPropertyNextValue?: string,
// ) => void = (
//     token,

//     actionType,
//     actionTriggererURL,
//     actionTriggererItemName,
//     actionTriggererItemLabel,
//     activityType,
//     description,
//     sentByUser,
//     actionSubject,
//     actionValue,
//     collectionName,
//     groupByPropertyName,
//     groupByPropertyValue,
//     actionTriggererItemKey,
//     nextStateURL,
//     nextStateType,
//     nextStateValue,
//     modifiedPropertyName,
//     modifiedPropertyCurrentValue,
//     modifiedPropertyNextValue,
// ) => {
//     const cookies = new Cookies()

//     instance.patch(`users/activity`, {
//         "actionType": actionType,
//         "actionTriggererURL": actionTriggererURL,
//         "actionTriggererItemName": actionTriggererItemName,
//         "actionTriggererItemLabel": actionTriggererItemLabel,
//         "activityType": activityType,
//         "description": description,
//         "sentByUser": sentByUser,
//         "actionSubject": actionSubject,
//         "actionValue": actionValue,
//         "collectionName": collectionName,
//         "groupByPropertyName": groupByPropertyName,
//         "groupByPropertyValue": groupByPropertyValue,
//         "actionTriggererItemKey": actionTriggererItemKey,
//         "nextStateURL": nextStateURL,
//         "nextStateType": nextStateType,
//         "nextStateValue": nextStateValue,
//         "modifiedPropertyName": modifiedPropertyName,
//         "modifiedPropertyCurrentValue": modifiedPropertyCurrentValue,
//         "modifiedPropertyNextValue": modifiedPropertyNextValue
//     }, {
//         headers: {
//             'Authorization': "Bearer " + token,
//             'Content-Type': 'application/json'},
//     }).then((res) => {
//         return res.data
//     }).catch((e) => {
//         //app.loadingIndicator.set("failed")
//         return e
//     })
// }
