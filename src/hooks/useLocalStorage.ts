export function useLocalStorage<T>(key: string, initial: T) {
    const value = localStorage.getItem(key);
    if (!value) {
        localStorage.setItem(key, JSON.stringify(initial));
        return initial;
    }
    return JSON.parse(value) as T;
}
