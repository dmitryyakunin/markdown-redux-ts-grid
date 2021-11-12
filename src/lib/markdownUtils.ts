
interface MarkdownHeader{
    title: string;
    author: string;
    date: string;
    briefly: string;
}

export function getMarkdownHeader(content: string) {
    let header: MarkdownHeader = {title: '', author: '', date: '', briefly: ''};

    header.title = getHeaderElement(content, 'title:', 'date:');
    header.date = getHeaderElement(content, 'date:', 'author:');
    header.author = getHeaderElement(content, 'author:', 'briefly:');
    header.briefly = getHeaderElement(content, 'briefly:', '---');
    return header;
}

export function getMarkdownContent(content: string) {
    let posStart = content.indexOf('briefly:');
    let posEnd = content.indexOf('---', posStart+1);
    return content.substr(posEnd + 4);
}

export function getHeaderElement(content: string, startWord: string, endWord: string) {
    let posStart = content.indexOf(startWord);
    let posEnd = content.indexOf(endWord, posStart+1);
    return  content.substr(posStart+startWord.length+1, posEnd-posStart-startWord.length-1);
}