export function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
}

export function debounce(func, timeout = 300) {
    let timer;

    return (...args) => {
      clearTimeout(timer);
      
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }