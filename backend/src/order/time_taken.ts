export default function time_taken(start: Date, end: Date) {
    let total_time = 0
    // total_time = total_time + ((end.getFullYear() - start.getFullYear()) * 15768000)
    // total_time = total_time + (end.getMonth() - start.getMonth() * 43200)
    // total_time = total_time + ((end.getDate() - start.getDate() * 1440))
    total_time = total_time + ((end.getHours() - start.getHours() * 60))
    total_time = total_time + (end.getMinutes() - start.getMinutes())
    return total_time
}

interface choice {
    name: string,
    price: number
}

interface topping {
    name: string,
    price: number,
    choice: choice
}

export function equal(oldorder: topping[], neworder: topping[]) {
    if (oldorder.length !== neworder.length) {
        return false
    }
    for (let i = 0; i < oldorder.length; i++) {
        if (oldorder[i].name !== neworder[i].name) {
            return false
        }
        if (oldorder[i].choice.name !== neworder[i].choice.name) {
            return false
        }
    }
    return true
}