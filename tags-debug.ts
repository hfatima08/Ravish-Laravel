import { translate as $l } from "@padloc/locale/src/translate";
import { StateMixin } from "../mixins/state";
import { Routing } from "../mixins/routing";
import { shared } from "../styles";
import { app, router } from "../globals";
import "./icon";
import { customElement, property, state } from "lit/decorators.js";
import { css, html, LitElement } from "lit";

@customElement("pl-tags-view")
export class TagsView extends Routing(StateMixin(LitElement)) {
    routePattern = /^tags(?:\/([^\/]+))?/;

    @property()
    selectedTag: string | null = null;

    @state()
    private _tagCount = 0;

    async handleRoute([tagName]: [string], params: { [prop: string]: string }) {
        this.selectedTag = tagName || null;
        this._updateTagCount();
    }

    async stateChanged() {
        this._updateTagCount();
    }

    private _updateTagCount() {
        const tagCounts = new Map<string, number>();
        
        // Count items for each tag across all vaults
        for (const vault of this.state.vaults) {
            for (const item of vault.items) {
                for (const tag of item.tags) {
                    tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
                }
            }
        }

        this._tagCount = tagCounts.size;
    }

    private _onTagClick(tagName: string) {
        router.go(`tags/${tagName}`);
    }

    static styles = [
        shared,
        css`
            :host {
                display: flex;
                flex-direction: column;
                height: 100%;
                background: var(--color-background);
                padding: 2em;
            }

            .debug-info {
                background: var(--color-shade-1);
                padding: 1em;
                border-radius: 8px;
                margin-bottom: 1em;
            }

            .tag-card {
                background: var(--color-background);
                border: 1px solid var(--border-color);
                border-radius: 8px;
                padding: 1em;
                margin-bottom: 1em;
                cursor: pointer;
            }

            .tag-card:hover {
                background: var(--color-shade-1);
            }
        `,
    ];

    render() {
        return html`
            <div class="debug-info">
                <h2>Tags Debug View</h2>
                <p>Total tags found: ${this._tagCount}</p>
                <p>Selected tag: ${this.selectedTag || 'None'}</p>
                <p>Total vaults: ${this.state.vaults.length}</p>
                <p>Total items: ${this.state.vaults.reduce((sum, vault) => sum + vault.items.length, 0)}</p>
            </div>

            ${this.selectedTag 
                ? html`
                    <div class="tag-card">
                        <h3>Selected Tag: ${this.selectedTag}</h3>
                        <p>This would show items with tag "${this.selectedTag}"</p>
                        <button @click=${() => router.go("tags")}>Back to Tags</button>
                    </div>
                `
                : html`
                    <div class="tag-card" @click=${() => this._onTagClick("test-tag")}>
                        <h3>Test Tag (Click me)</h3>
                        <p>This is a test tag card. Click to simulate tag selection.</p>
                    </div>
                `
            }
        `;
    }
}