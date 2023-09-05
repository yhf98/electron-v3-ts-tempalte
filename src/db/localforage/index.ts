import localforage from 'localforage'

localforage.config({
    driver      : localforage.INDEXEDDB, // 使用 WebSQL；也可以使用 setDriver()
    name        : 'geek',
    version     : 1.0,
    size        : 4980736, // 数据库的大小，单位为字节。现仅 WebSQL 可用
    storeName   : 'geek', // 仅接受字母，数字和下划线
    description : 'geek客制化键盘存储器'
});

/**
 * 设置对应key的值
 * @param key 键
 * @param value 值
 * @returns Promise<String>
 */
export const setItem = (key, value) =>{
    return new Promise((resolve,reject)=>{
        localforage.setItem(key, value)
        .then(res=>resolve(res))
        .catch(err=>reject(err));
    })
}
/**
 * 获取对应key的数据
 * @param key 键
 * @returns Promise<String>
 */
export const getItem = (key) => {
    return new Promise((resolve,reject) =>{
        localforage.getItem(key, (err, value) => {
            if(err){
                console.info("没找到数据:", err);
                reject(err);
            }
            if(key == 'system' && value == null){
                setItem('system',JSON.stringify(INIT_SYSTEM_DATA)).then(res =>{
                    console.info("初始化系统数据: ", res);
                    resolve(res);
                });
            }else{
                console.info("数据:", value);
                resolve(value);
            }
        });
    })
}

/**
 * 移除元素
 * @param key 键
 * @returns Promise<NULL>
 */
export const removeData = (key) => {
    return new Promise((resolve,reject) =>{
        localforage.removeItem(key)
        .then(()=> resolve(`key[${key}]is cleared`) )
        .catch(err => reject(err));
    })
}

/**
 * 删除所有的 key，重置数据库。
 * @returns Promise<NULL>
 */
 export const clearData = () => {
    return new Promise((resolve,reject) =>{
        localforage.clear()
        .then(() => resolve('Database is now empty.'))
        .catch(err => reject(err));
    })
}

/**
 * 获取离线仓库中的 key 的数量（即数据仓库的“长度”）
 * @returns Promise<Number>
 */
export const getLength = () => {
    return new Promise((resolve,reject) =>{
        localforage.length()
        .then(numberOfKeys => resolve(numberOfKeys))
        .catch(err => reject(err));
    })
}

/**
 * 获取数据仓库中所有的 key。
 * @returns Promise<String>
 */
export const getKeys = () => {
    return new Promise((resolve,reject) =>{
        localforage.keys()
        .then(keys => resolve(keys))
        .catch(err => reject(err));
    })
}

/**
 * 迭代数据仓库中的所有 value/key 键值对。
 * @returns Promise<List>
 */
export const getDataList = () => {
    var dataList = []
    return new Promise((resolve,reject) =>{
        localforage
        .iterate(function(value, key) {
            dataList.push({[key] : value})
        })
        .then(() => resolve(dataList))
        .catch(err => reject(err));
    })
}

export const INIT_SYSTEM_DATA = {
    lang: "en-US",
    theme: "light",
}