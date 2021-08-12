//===========================Input Parser========================//
function correctInput(command, content) {
    var correctedContent = content;
    correctedContent = replaceCharacterWithSpace(correctedContent, '.');
    correctedContent = replaceCharacterWithSpace(correctedContent, '  ');
    correctedContent = replaceSpacesWithHyphens(command, correctedContent);
    return correctedContent;
}

function replaceSpacesWithHyphens(command, content) {
    const contentArray = content.split(" ");
    const variableNumber = contentArray.length;
    let fixedContent = content;
    if (command !== '$vs') { //CURRENTLY $VS IS THE ONLY COMMAND THAT TAKES MULTIPLE INPUT PARAMETERS
        if (variableNumber !== 1) { //means there's a space in a single input command
            fixedContent = contentArray.join('-'); //remove spaces and put in hypens
        }
    }
    return fixedContent;
}

function replaceCharacterWithSpace(content, character) {
    let fixedContent = content;
    if (content.indexOf(character) !== -1) {
        fixedContent = content.split(character).join(" ");
    }
    return fixedContent;
}

//=======================EXPORTS====================//
module.exports = { correctInput };