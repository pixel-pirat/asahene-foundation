import { useState } from "react";
import { Plus, Trash2, Save, X as XIcon, Pencil } from "lucide-react";
import { Btn, Card, Field, inputCls } from "./AdminShell";

export type FieldDef<T> = {
  name: keyof T & string;
  label: string;
  type?: "text" | "number" | "textarea" | "url" | "checkbox";
  placeholder?: string;
  hint?: string;
  full?: boolean;
};

export function CrudList<T extends { id: string }>({
  title,
  description,
  items,
  fields,
  empty,
  blank,
  onAdd,
  onUpdate,
  onRemove,
  renderRow,
}: {
  title: string;
  description?: string;
  items: T[];
  fields: FieldDef<T>[];
  empty: Omit<T, "id">;
  blank?: string;
  onAdd: (v: Omit<T, "id">) => void;
  onUpdate: (id: string, v: Partial<T>) => void;
  onRemove: (id: string) => void;
  renderRow: (item: T) => React.ReactNode;
}) {
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState<any>(empty);
  const [adding, setAdding] = useState(false);

  const startAdd = () => { setDraft(empty); setEditing(null); setAdding(true); };
  const startEdit = (item: T) => { setDraft(item); setAdding(false); setEditing(item.id); };
  const cancel = () => { setEditing(null); setAdding(false); setDraft(empty); };

  const submit = () => {
    if (adding) onAdd(draft);
    else if (editing) onUpdate(editing, draft);
    cancel();
  };

  return (
    <Card>
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-bold">{title}</h2>
          {description && <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>}
        </div>
        {!adding && !editing && (
          <Btn onClick={startAdd}><Plus className="h-4 w-4" /> Add</Btn>
        )}
      </div>

      {(adding || editing) && (
        <div className="mt-5 rounded-xl border border-primary/30 bg-muted/30 p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            {fields.map((f) => (
              <div key={f.name} className={f.full || f.type === "textarea" ? "sm:col-span-2" : ""}>
                <Field label={f.label} hint={f.hint}>
                  {f.type === "textarea" ? (
                    <textarea
                      rows={3}
                      value={draft[f.name] ?? ""}
                      placeholder={f.placeholder}
                      onChange={(e) => setDraft({ ...draft, [f.name]: e.target.value })}
                      className={inputCls}
                    />
                  ) : f.type === "checkbox" ? (
                    <input
                      type="checkbox"
                      checked={!!draft[f.name]}
                      onChange={(e) => setDraft({ ...draft, [f.name]: e.target.checked })}
                      className="h-5 w-5 rounded border-input text-primary"
                    />
                  ) : (
                    <input
                      type={f.type ?? "text"}
                      value={draft[f.name] ?? ""}
                      placeholder={f.placeholder}
                      onChange={(e) => {
                        const v = f.type === "number" ? Number(e.target.value) : e.target.value;
                        setDraft({ ...draft, [f.name]: v });
                      }}
                      className={inputCls}
                    />
                  )}
                </Field>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <Btn variant="ghost" onClick={cancel}><XIcon className="h-4 w-4" /> Cancel</Btn>
            <Btn onClick={submit}><Save className="h-4 w-4" /> Save</Btn>
          </div>
        </div>
      )}

      <div className="mt-5">
        {items.length === 0 ? (
          <p className="rounded-lg border border-dashed border-border bg-muted/20 p-6 text-center text-sm text-muted-foreground">
            {blank ?? "No items yet. Click Add to create one."}
          </p>
        ) : (
          <ul className="divide-y divide-border">
            {items.map((item) => (
              <li key={item.id} className="flex items-start gap-4 py-4">
                <div className="min-w-0 flex-1">{renderRow(item)}</div>
                <div className="flex shrink-0 gap-2">
                  <button
                    onClick={() => startEdit(item)}
                    className="grid h-8 w-8 place-items-center rounded-md border border-border bg-background text-muted-foreground hover:border-primary hover:text-primary"
                    aria-label="Edit"
                  ><Pencil className="h-3.5 w-3.5" /></button>
                  <button
                    onClick={() => { if (confirm("Delete this item?")) onRemove(item.id); }}
                    className="grid h-8 w-8 place-items-center rounded-md border border-border bg-background text-muted-foreground hover:border-destructive hover:text-destructive"
                    aria-label="Delete"
                  ><Trash2 className="h-3.5 w-3.5" /></button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Card>
  );
}
