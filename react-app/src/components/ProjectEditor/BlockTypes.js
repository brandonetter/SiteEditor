const toggleInlineStyle = true;
export const BLOCK_TYPES = [
    { label: 'B', style: 'BOLD', type: toggleInlineStyle },
    { label: 'I', style: 'ITALIC', type: toggleInlineStyle },
    { label: 'U', style: 'UNDERLINE', type: toggleInlineStyle },
    { label: 'UL', style: 'unordered-list-item' },
    { label: 'OL', style: 'ordered-list-item' },
    { label: 'break', style: 'CODE', type: toggleInlineStyle, isBreak: true },
    { label: 'H1', style: 'header-one' },
    { label: 'H2', style: 'header-two' },
    { label: 'H3', style: 'header-three' },
    { label: 'H4', style: 'header-four' },
    { label: 'H5', style: 'header-five' },
    { label: 'H6', style: 'header-six' },
    { label: 'break2', style: 'CODE', type: toggleInlineStyle, isBreak: true },
    { label: 'Blockquote', style: 'blockquote' },
    { label: 'Code Block', style: 'code-block' },

    { label: 'break3', style: 'CODE', type: toggleInlineStyle, isBreak: true },


];

export const styleMap = {
    'red': {
        color: 'red',
    },

    'CODE': {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        color: 'white',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        lineHeight: '1.35',
    },
    'align-right': {
        display: 'flex',
        justifyContent: 'flex-end',

    },
    'align-center': {
        display: 'flex',
        justifyContent: 'center',
    },
    'align-left': {
        float: 'left',
    },




};
