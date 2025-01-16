function setItem(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error("Error setting item in local storage:", error);
    }
}

function getItem(key) {
    try {
        const item = localStorage.getItem(key);
        if (item) {
            return JSON.parse(item);
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
}

function removeItem(key) {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error("Error removing item from local storage:", error);
    }
}

function clearStorage() {
    try {
        localStorage.clear();
    } catch (error) {
        console.error("Error clearing local storage:", error);
    }
}

export {getItem,setItem,removeItem,clearStorage};