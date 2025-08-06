import { translate as $l } from "@padloc/locale/src/translate";
import { StateMixin } from "../mixins/state";
import { shared } from "../styles";
import { app } from "../globals";
import "./icon";
import "./button";
import { customElement, state } from "lit/decorators.js";
import { css, html, LitElement } from "lit";

interface TagCard {
    name: string;
    count: number;
}

@customElement("pl-tag-cards")
export class TagCards extends StateMixin(LitElement) {
    @state()
    private _tagCards: TagCard[] = [];

    async stateChanged() {
        this._updateTagCards();
    }

    private _updateTagCards() {
        const tagCounts = new Map<string, number>();
        
        // Count items for each tag across all vaults
        for (const vault of this.state.vaults) {
            for (const item of vault.items) {
                for (const tag of item.tags) {
                    tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
                }
            }
        }

        // Convert to array and sort alphabetically
        this._tagCards = Array.from(tagCounts.entries())
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => a.name.localeCompare(b.name));
    }

    private _onTagClick(tagName: string) {
        this.dispatchEvent(new CustomEvent("tag-selected", { 
            detail: { tag: tagName },
            bubbles: true,
            composed: true 
        }));
    }

    static styles = [
        shared,
        css`
            :host {
                display: flex;
                flex-direction: column;
                height: 100%;
                background: var(--color-background);
            }

            .header {
                padding: 1em;
                border-bottom: 1px solid var(--border-color);
            }

            .header h2 {
                margin: 0;
                font-size: 1.2em;
                font-weight: 600;
                color: var(--color-foreground);
            }

            .content {
                flex: 1;
                padding: 1em;
                overflow-y: auto;
            }

            .tags-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                gap: 1em;
                padding: 0.5em;
            }

            .tag-card {
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

            .tag-card:hover {
                background: var(--color-shade-1);
                border-color: var(--color-highlight);
                transform: translateY(-2px);
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }

            .tag-icon {
                color: var(--color-highlight);
                font-size: 1.2em;
            }

            .tag-info {
                flex: 1;
                min-width: 0;
            }

            .tag-name {
                font-weight: 500;
                color: var(--color-foreground);
                margin-bottom: 0.25em;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .tag-count {
                font-size: 0.9em;
                color: var(--color-shade-2);
            }

            .no-tags {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100%;
                color: var(--color-shade-2);
                text-align: center;
                padding: 2em;
            }

            .no-tags-icon {
                font-size: 4em;
                margin-bottom: 1em;
                opacity: 0.5;
            }

            .no-tags-text {
                font-size: 1.1em;
                margin-bottom: 0.5em;
            }

            .no-tags-subtext {
                font-size: 0.9em;
                opacity: 0.7;
            }
        `,
    ];

    render() {
        if (this._tagCards.length === 0) {
            return html`
                <div class="no-tags">
                    <pl-icon icon="tags-${app.effectiveTheme}" class="no-tags-icon"></pl-icon>
                    <div class="no-tags-text">${$l("No Tags Available")}</div>
                    <div class="no-tags-subtext">${$l("Create some items with tags to see them here")}</div>
                </div>
            `;
        }

        return html`
            <div class="header">
                <h2>${$l("Tags")}</h2>
            </div>
            <div class="content">
                <div class="tags-grid">
                    ${this._tagCards.map(tag => html`
                        <div class="tag-card" @click=${() => this._onTagClick(tag.name)}>
                            <pl-icon icon="tag" class="tag-icon"></pl-icon>
                            <div class="tag-info">
                                <div class="tag-name">${tag.name}</div>
                                <div class="tag-count">${$l("{0} items", tag.count.toString())}</div>
                            </div>
                        </div>
                    `)}
                </div>
            </div>
        `;
    }
}