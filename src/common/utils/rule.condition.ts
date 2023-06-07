// function towhereCondition(obj1, obj2, condition) {
//     let rs = {
//         where: [obj1, obj2]
//     }
//     if (condition == '|') {
//         rs.whereConditions = 'OR'
//     }
//     return rs
// }

// function ArrayToObj(arr) {
//     let key = `$${arr[1]}`
//     return {
//         [arr[0]]: {
//             [key]: arr[2]
//         }
//     }
// }

// function change(arr) {
//     console.log(arr);
//     let signs = []
//     let commands = []
//     let rs = [];
//     for (let i = arr.length - 1; i >= 0; i--) {
//         if (typeof arr[i] === 'object') {
//             commands.push(ArrayToObj(arr[i]))
//         } else {
//             signs.push(arr[i])
//         }
//         if (commands.length >= 2 && signs.length >= 1) {
//             let command_1 = commands.pop()
//             let command_2 = commands.pop()
//             let sign = signs.pop()
//             rs.push(towhereCondition(command_1,command_2,sign))
//         }
//         else if (commands.length >= 1 && signs.length >= 1) {
//             let command_1 = commands.pop()
//             let command_2 = rs.pop()
//             let sign = signs.pop()
//             rs.push(towhereCondition(command_1,command_2,sign))
//         }
//         else if (rs.length >= 2 && signs.length >= 1) {
//             let command_1 = rs.pop()
//             let command_2 = rs.pop()
//             let sign = signs.pop()
//             rs.push(towhereCondition(command_1,command_2,sign))
//         }
//     }
//     console.log(rs);
//     console.dir(rs, { depth: null });
// }

// change(['&', '|', '&', ['id', 'eq', 5], ['name', 'eq', 'dung'], ['name ', 'eq', 'an'], '|', ['age', 'lt', 18], ['age', 'gt', 30]])
