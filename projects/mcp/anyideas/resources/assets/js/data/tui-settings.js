export const EditorSettings = (override) => ({
    previewStyle: 'vertical',
    initialEditType: 'wysiwyg',
    height: '500px',
    usageStatistics: false,
    ...override
})

export const ViewerSettings = (override) => ({
    height: 'auto',
    ...override
})