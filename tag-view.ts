import { View } from "./view";
import { StateMixin } from "../mixins/state";
import { Routing } from "../mixins/routing";
import { ItemsList } from "./items-list";
import "./item-view";
import { customElement, query, state } from "lit/decorators.js";
import { html, css } from "lit";
import { router } from "../globals";
import { translate as $l } from "@padloc/locale/src/translate";
import { app } from "../globals";
import { shared } from "../styles";
import "./icon";
import "./button";
import "./input";

// Import your pl-tag-cards component here if not already imported
import "./tag-card";

@customElement("pl-tags-view")
export class TagsView extends Routing(StateMixin(View)) {
    // This route pattern will now capture both the selected tag and the selected item ID.
    readonly routePattern = /^tags(?:\/([^\/]+)(?:\/([^\/]+))?)?/;

    @state()
    private _selectedTag: string | null = null;
    
    @state()
    private _selectedItemId: string | null = null;

    @query("pl-items-list")
    private _itemsList: ItemsList;

    async handleRoute([tagName, itemId]: [string, string]) {
        this._selectedTag = tagName || null;
        this._selectedItemId = itemId || null;

        if (this.active) {
            if (this._selectedTag && !this._selectedItemId) {
                this._itemsList?.cancelSearch();
            }
        }
    }

    private _onTagSelected(e: CustomEvent) {
        const { tag } = e.detail;
        router.go(`tags/${tag}`);
    }

    private _onItemSelected(e: CustomEvent) {
        const { itemId } = e.detail;
        router.go(`tags/${this._selectedTag}/${itemId}`);
    }

    private _getVaultsWithTag(tagName: string) {
        return this.state.vaults.filter(vault => 
            vault.items.some(item => item.tags.includes(tagName))
        );
    }

    private _onVaultClick(vaultId: string) {
        // Navigate to the vault view or show vault details
        router.go(`vaults/${vaultId}`);
    }

    render() {
        const hasTagSelected = !!this._selectedTag;
        const hasItemSelected = !!this._selectedItemId;
        const vaultsWithTag = hasTagSelected ? this._getVaultsWithTag(this._selectedTag!) : [];
            
        return html`
            <div class="fullbleed pane layout ${hasItemSelected ? "open" : ""}">
                <pl-tag-cards
                    class="menu"
                    @tag-selected=${this._onTagSelected}
                    .selectedTag=${this._selectedTag}
                ></pl-tag-cards>

                ${hasTagSelected 
                    ? html`
                        <div class="pane vaults-pane">
                            <header class="padded spacing horizontal center-aligning layout">
                                <div class="horizontal spacing center-aligning layout">
                                    <pl-icon icon="vault-${app.effectiveTheme}"></pl-icon>
                                    <div class="stretch collapse ellipsis">
                                        ${$l("Vaults with tag '{0}'", this._selectedTag)}
                                    </div>
                                </div>
                            </header>
                            
                            <div class="content">
                                ${vaultsWithTag.length > 0 
                                    ? html`
                                        <div class="vaults-grid">
                                            ${vaultsWithTag.map(vault => html`
                                                <div 
                                                    class="vault-card" 
                                                    @click=${() => this._onVaultClick(vault.id)}
                                                >
                                                    <pl-icon icon="vault-${app.effectiveTheme}" class="vault-icon"></pl-icon>
                                                    <div class="vault-info">
                                                        <div class="vault-name">${vault.name}</div>
                                                        <div class="vault-count">
                                                            ${$l("{0} items with this tag", 
                                                                vault.items.filter(item => item.tags.includes(this._selectedTag!)).length.toString()
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            `)}
                                        </div>
                                    `
                                    : html`
                                        <div class="no-vaults">
                                            <pl-icon icon="vault-${app.effectiveTheme}" class="no-vaults-icon"></pl-icon>
                                            <div class="no-vaults-text">${$l("No vaults found with this tag")}</div>
                                        </div>
                                    `
                                }
                            </div>
                        </div>
                    `
                    : html`
                        <div class="pane no-selection-pane">
                            <div class="no-selection">
                                <pl-icon icon="vault-${app.effectiveTheme}" class="no-selection-icon"></pl-icon>
                                <div class="no-selection-text">${$l("No Tag Selected")}</div>
                                <div class="no-selection-subtext">${$l("Select a tag to see vaults containing items with that tag")}</div>
                            </div>
                        </div>
                    `
                }

                <pl-item-view
                    class="stretch"
                    .selected=${hasItemSelected ? this._selectedItemId : null}
                    ?hidden=${!hasItemSelected}
                ></pl-item-view>
            </div>
        `;
    }

    static styles = [
        ...View.styles,
        shared,
        css`
            .pane {
                flex: 1;
                border-right: solid 1px var(--border-color);
            }
            .layout {
                display: flex;
            }
            .menu {
                width: 30em;
                border-right: solid 1px var(--border-color);
            }
            
            .vaults-pane {
                display: flex;
                flex-direction: column;
                background: var(--color-background);
            }
            
            .content {
                flex: 1;
                padding: 1em;
                overflow-y: auto;
            }
            
            .vaults-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                gap: 1em;
                padding: 0.5em;
            }
            
            .vault-card {
                background: var(--color-background);
                border: 1px solid var(--border-color);
                border-radius: 8px;
                padding: 1em;
                cursor: pointer;
                transition: all 0.2s ease;
                display: flex;
                align-items: center;
                gap: 0.5em;
            }
            
            .vault-card:hover {
                background: var(--color-shade-1);
                border-color: var(--color-highlight);
                transform: translateY(-2px);
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            
            .vault-icon {
                color: var(--color-highlight);
                font-size: 1.2em;
            }
            
            .vault-info {
                flex: 1;
                min-width: 0;
            }
            
            .vault-name {
                font-weight: 500;
                color: var(--color-foreground);
                margin-bottom: 0.25em;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            
            .vault-count {
                font-size: 0.9em;
                color: var(--color-shade-2);
            }
            
            .no-vaults {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100%;
                color: var(--color-shade-2);
                text-align: center;
                padding: 2em;
            }
            
            .no-vaults-icon {
                font-size: 4em;
                margin-bottom: 1em;
                opacity: 0.5;
            }
            
            .no-vaults-text {
                font-size: 1.1em;
                margin-bottom: 0.5em;
            }
            
            .no-selection-pane {
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .no-selection {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                color: var(--color-shade-2);
                text-align: center;
                padding: 2em;
            }
            
            .no-selection-icon {
                font-size: 4em;
                margin-bottom: 1em;
                opacity: 0.5;
            }
            
            .no-selection-text {
                font-size: 1.1em;
                margin-bottom: 0.5em;
            }
            
            .no-selection-subtext {
                font-size: 0.9em;
                opacity: 0.7;
            }
        `,
    ];
}