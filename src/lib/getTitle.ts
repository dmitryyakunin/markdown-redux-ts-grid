
export function getTitle(str: string[], conf: string) {
    let title = str.find(titl => titl.includes(conf));
    if(title) {
        let titleArray = title.split('-');
        return titleArray[1];
    } else {
        return '';
    }
}

