export function serializeCanvas(editor: any) {
  if (!editor) return {};
  return editor.store.serialize();
}

export function validatePatches(_patches: any) {
  return true;
}
