export const types = Object.freeze({
    onehanded: 'itp_type_one_handed_wpn',
    twohanded: 'itp_type_two_handed_wpn',
    polearm: 'itp_type_polearm',
    bow: 'itp_type_bow',
    crossbow: 'itp_type_crossbow',
    thrown: 'itp_type_thrown',
    arrow: 'itp_type_arrows',
    bolt: 'itp_type_bolts',
    shield: 'itp_type_shield',
    headarmor: 'itp_type_head_armor',
    bodyarmor: 'itp_type_body_armor',
    footarmor: 'itp_type_foot_armor',
    handarmor: 'itp_type_hand_armor',
    mount: 'itp_type_horse',
})

const melee = new Set([types.onehanded, types.twohanded, types.polearm])
const ranged = new Set([types.bow, types.crossbow, types.thrown])
const ammunition = new Set([types.arrow, types.bolt])
const shield = new Set([types.shield])
const armor = new Set([types.headarmor, types.bodyarmor, types.footarmor, types.handarmor])
const mount = new Set([types.mount])

export function initialize(type) {
    return fetch('items.json')
        .then(x => x.json())
        .then(x => {
            if (melee.has(type))
                initializeMelee(x, type)
            else if (ranged.has(type))
                initializeRanged(x, type)
            else if (ammunition.has(type))
                initializeAmmunition(x, type)
            else if (shield.has(type))
                initializeShield(x, type)
            else if (armor.has(type))
                initializeArmor(x, type)
            else if (mount.has(type))
                initializeMount(x, type)
        })
}

function* getItems(items, type) {
    for (const item of items) {
        if (item.index === 0)
            continue
        if (/^itm_imodbits?_/.test(item.id))
            continue
        if (item.type === type)
            yield item
    }
}

function initializeMelee(items, type) {
    const table = document.createElement('table')
    const thead = document.createElement('thead')
    const trHead = document.createElement('tr')
    const columns = ['ID', 'Name', 'Str Req.', 'Weight', 'Speed', 'Reach', 'Swing', 'Thrust', 'Value', 'Flags']
    for (const text of columns) {
        const th = document.createElement('th')
        th.innerText = text
        trHead.appendChild(th)
    }
    thead.appendChild(trHead)
    table.appendChild(thead)

    const tbody = document.createElement('tbody')
    const matchedItems = [...getItems(items, type)]
    matchedItems.sort((a, b) => a.value - b.value)

    for (const item of matchedItems) {
        const tr = document.createElement('tr')
        const index = []
        for (let i = 0; i < columns.length; i++) {
            const td = document.createElement('td')
            index.push(td)
            tr.appendChild(td)
        }
        let i = 0
        index[i++].innerText = item.id
        index[i++].innerText = item.name
        index[i++].innerText = item.difficulty?.value ?? '-'
        index[i++].innerText = item.weight
        index[i++].innerText = item.speedRating
        index[i++].innerText = item.weaponLength
        index[i++].innerText = item.damageSwing ? `${item.damageSwing.amount}${item.damageSwing.type}` : '-'
        index[i++].innerText = item.damageThrust ? `${item.damageThrust.amount}${item.damageThrust.type}` : '-'
        index[i++].innerText = item.value
        index[i++].innerText = item.weaponFlags.join()
        tbody.appendChild(tr)
    }
    table.appendChild(tbody)
    document.body.appendChild(table)
}

function initializeRanged(items, type) {
    const table = document.createElement('table')
    const thead = document.createElement('thead')
    const trHead = document.createElement('tr')
    const requirement = (() => {
        if (type === types.bow)
            return 'PD Req.'
        else if (type === types.crossbow)
            return 'Str Req.'
        else if (type === types.thrown)
            return 'Thr Req.'
    })()
    const columns = ['ID', 'Name', requirement, 'Weight', 'Speed', 'Missile Speed', 'Accuracy', 'Damage', 'Ammo', 'Value', 'Flags']
    for (const text of columns) {
        const th = document.createElement('th')
        th.innerText = text
        trHead.appendChild(th)
    }
    thead.appendChild(trHead)
    table.appendChild(thead)

    const tbody = document.createElement('tbody')
    const matchedItems = [...getItems(items, type)]
    matchedItems.sort((a, b) => a.value - b.value)

    for (const item of matchedItems) {
        const tr = document.createElement('tr')
        const index = []
        for (let i = 0; i < columns.length; i++) {
            const td = document.createElement('td')
            index.push(td)
            tr.appendChild(td)
        }
        let i = 0
        index[i++].innerText = item.id
        index[i++].innerText = item.name
        index[i++].innerText = item.difficulty?.value ?? '-'
        index[i++].innerText = item.weight
        index[i++].innerText = item.speedRating
        index[i++].innerText = item.missileSpeed
        index[i++].innerText = item.accuracy
        index[i++].innerText = item.damageRanged ? `${item.damageRanged.amount}${item.damageRanged.type}` : '-'
        index[i++].innerText = item.maxAmmo
        index[i++].innerText = item.value
        index[i++].innerText = item.weaponFlags.join()
        tbody.appendChild(tr)
    }
    table.appendChild(tbody)
    document.body.appendChild(table)
}

function initializeAmmunition(items, type) {
    const table = document.createElement('table')
    const thead = document.createElement('thead')
    const trHead = document.createElement('tr')
    const columns = ['ID', 'Name', 'Weight', 'Damage', 'Ammo', 'Value', 'Flags']
    for (const text of columns) {
        const th = document.createElement('th')
        th.innerText = text
        trHead.appendChild(th)
    }
    thead.appendChild(trHead)
    table.appendChild(thead)

    const tbody = document.createElement('tbody')
    const matchedItems = [...getItems(items, type)]
    matchedItems.sort((a, b) => a.value - b.value)

    for (const item of matchedItems) {
        const tr = document.createElement('tr')
        const index = []
        for (let i = 0; i < columns.length; i++) {
            const td = document.createElement('td')
            index.push(td)
            tr.appendChild(td)
        }
        let i = 0
        index[i++].innerText = item.id
        index[i++].innerText = item.name
        index[i++].innerText = item.weight
        index[i++].innerText = item.damageRanged ? `${item.damageRanged.amount}${item.damageRanged.type}` : '-'
        index[i++].innerText = item.maxAmmo
        index[i++].innerText = item.value
        index[i++].innerText = item.weaponFlags.join()
        tbody.appendChild(tr)
    }
    table.appendChild(tbody)
    document.body.appendChild(table)
}

function initializeShield(items, type) {
    const table = document.createElement('table')
    const thead = document.createElement('thead')
    const trHead = document.createElement('tr')
    const columns = ['ID', 'Name', 'Shd Req.', 'Weight', 'Hit Points', 'Resistance', 'Size', 'Speed', 'Value', 'Flags']
    for (const text of columns) {
        const th = document.createElement('th')
        th.innerText = text
        trHead.appendChild(th)
    }
    thead.appendChild(trHead)
    table.appendChild(thead)

    const tbody = document.createElement('tbody')
    const matchedItems = [...getItems(items, type)]
    matchedItems.sort((a, b) => a.value - b.value)

    for (const item of matchedItems) {
        const tr = document.createElement('tr')
        const index = []
        for (let i = 0; i < columns.length; i++) {
            const td = document.createElement('td')
            index.push(td)
            tr.appendChild(td)
        }
        let i = 0
        index[i++].innerText = item.id
        index[i++].innerText = item.name
        index[i++].innerText = item.difficulty?.value ?? '-'
        index[i++].innerText = item.weight
        index[i++].innerText = item.hitPoints
        index[i++].innerText = item.shieldArmor
        index[i++].innerText = item.shieldWidth === item.shieldHeight ? item.shieldWidth * 2 : `${item.shieldWidth * 2}×${item.shieldWidth + item.shieldHeight}`
        index[i++].innerText = item.speedRating
        index[i++].innerText = item.value
        index[i++].innerText = item.weaponFlags.join()
        tbody.appendChild(tr)
    }
    table.appendChild(tbody)
    document.body.appendChild(table)
}

function initializeArmor(items, type) {
    const table = document.createElement('table')
    const thead = document.createElement('thead')
    const trHead = document.createElement('tr')
    const columns = ['ID', 'Name', 'Str Req.', 'Weight', 'Head Armor', 'Body Armor', 'Leg Armor', 'Value']
    for (const text of columns) {
        const th = document.createElement('th')
        th.innerText = text
        trHead.appendChild(th)
    }
    thead.appendChild(trHead)
    table.appendChild(thead)

    const tbody = document.createElement('tbody')
    const matchedItems = [...getItems(items, type)]
    matchedItems.sort((a, b) => a.value - b.value)

    for (const item of matchedItems) {
        const tr = document.createElement('tr')
        const index = []
        for (let i = 0; i < columns.length; i++) {
            const td = document.createElement('td')
            index.push(td)
            tr.appendChild(td)
        }
        let i = 0
        index[i++].innerText = item.id
        index[i++].innerText = item.name
        index[i++].innerText = item.difficulty?.value ?? '-'
        index[i++].innerText = item.weight
        index[i++].innerText = item.headArmor
        index[i++].innerText = item.bodyArmor
        index[i++].innerText = item.legArmor
        index[i++].innerText = item.value
        tbody.appendChild(tr)
    }
    table.appendChild(tbody)
    document.body.appendChild(table)
}

function initializeMount(items, type) {
    const table = document.createElement('table')
    const thead = document.createElement('thead')
    const trHead = document.createElement('tr')
    const columns = ['ID', 'Name', 'Rid Req.', 'Armor', 'Speed', 'Maneuver', 'Charge', 'Hit Points', 'Value']
    for (const text of columns) {
        const th = document.createElement('th')
        th.innerText = text
        trHead.appendChild(th)
    }
    thead.appendChild(trHead)
    table.appendChild(thead)

    const tbody = document.createElement('tbody')
    const matchedItems = [...getItems(items, type)]
    matchedItems.sort((a, b) => a.value - b.value)

    for (const item of matchedItems) {
        const tr = document.createElement('tr')
        const index = []
        for (let i = 0; i < columns.length; i++) {
            const td = document.createElement('td')
            index.push(td)
            tr.appendChild(td)
        }
        let i = 0
        index[i++].innerText = item.id
        index[i++].innerText = item.name
        index[i++].innerText = item.difficulty?.value ?? '-'
        index[i++].innerText = item.mountArmor
        index[i++].innerText = item.speedRating
        index[i++].innerText = item.maneuver
        index[i++].innerText = item.damageCharge ? item.damageCharge.amount : '-'
        index[i++].innerText = item.hitPoints
        index[i++].innerText = item.value
        tbody.appendChild(tr)
    }
    table.appendChild(tbody)
    document.body.appendChild(table)
}
