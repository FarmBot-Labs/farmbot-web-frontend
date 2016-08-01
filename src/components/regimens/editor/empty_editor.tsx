import * as React from "react";

interface EmptyEditorProps {
}

/** The bottom half of the regimen editor panel (when there's something to
    actually edit). */
export function EmptyEditor({}: EmptyEditorProps) {
    return <div>
        <p data-l10n-id="regimens-editor-empty"> Please click "Add" to start editing a regimen. </p>
    </div>;
}
