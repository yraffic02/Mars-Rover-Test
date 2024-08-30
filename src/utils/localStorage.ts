export const setLocalStorageItem = (key: string, value: any): void => {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`Erro ao definir item no localStorage: ${error}`);
    }
};
  

export const getLocalStorageItem = (key: string): any | null => {
    try {
        const serializedValue = localStorage.getItem(key);
        if (serializedValue === null) return null;
        return JSON.parse(serializedValue);
    } catch (error) {
        console.error(`Erro ao obter item do localStorage: ${error}`);
        return null;
    }
};
  


export const clearAllLocalStorage = (): void => {
    try {
        localStorage.clear();
    } catch (error) {
        console.error(`Erro ao limpar o localStorage: ${error}`);
    }
};
  