import { View } from "./view";
import { StateMixin } from "../mixins/state";
import { Routing } from "../mixins/routing";
import "./item-view";
import { customElement, property, state } from "lit/decorators.js";
import { html, css, LitElement } from "lit";
import { router } from "../globals";
import { translate as $l } from "@padloc/locale/src/translate";
import { app } from "../globals";
import { shared } from "../styles";
import "./icon";
import "./button";
import "./input";
import "./virtual-list";

interface TagCard {
    name: string;
    count: number;
}

@customElement("pl-tag-cards")
export class TagCards extends StateMixin(LitElement) {
    @state()
    private _tagCards: TagCard[] = [];

    @state()
    private _filteredTagCards: TagCard[] = [];

    @state()
    private _filterShowing: boolean = false;

    @state()
    private _searchValue: string = "";

    @property()
    selectedTag: string | null = null;

    @query("#filterInput")
    private _filterInput: any;

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
        
        this._filterTags();
    }

    private _onTagClick(tagName: string) {
        this.dispatchEvent(new CustomEvent("tag-selected", { 
            detail: { tag: tagName },
            bubbles: true,
            composed: true 
        }));
    }

    async search(val?: string, focus = true) {
        this._filterShowing = true;
        await this.updateComplete;
        setTimeout(() => {
            if (val && val !== this._searchValue) {
                this._searchValue = val;
                this._filterInput.value = val;
                this._filterTags();
            }
            if (focus) {
                this._filterInput.focus();
            }
        }, 100);
    }

    cancelSearch() {
        this._searchValue = "";
        this._filterShowing = false;
        if (this._filterInput) {
            this._filterInput.value = "";
        }
        this._filterTags();
        this._filterInput?.blur();
    }

    private _filterTags() {
        if (!this._searchValue.trim()) {
            this._filteredTagCards = [...this._tagCards];
        } else {
            const term = this._searchValue.toLowerCase();
            this._filteredTagCards = this._tagCards.filter(tag => 
                tag.name.toLowerCase().includes(term)
            );
        }
        this.requestUpdate();
    }

    private _onSearchInput(e: Event) {
        const target = e.target as HTMLInputElement;
        this._searchValue = target.value;
        this._filterTags();
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

            header {
                overflow: visible;
                --input-focus-color: transparent;
            }

            .header-icon {
                height: 1.3em;
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

            .tag-card.selected {
                background: var(--color-highlight);
                border-color: var(--color-highlight);
                color: var(--color-background);
            }

            .tag-card.selected .tag-icon {
                color: var(--color-background);
            }

            .tag-card.selected .tag-name {
                color: var(--color-background);
            }

            .tag-card.selected .tag-count {
                color: var(--color-background);
                opacity: 0.8;
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

            .no-search-results {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100%;
                color: var(--color-shade-2);
                text-align: center;
                padding: 2em;
            }

            .no-search-results-icon {
                font-size: 4em;
                margin-bottom: 1em;
                opacity: 0.5;
            }

            .no-search-results-text {
                font-size: 1.1em;
                margin-bottom: 0.5em;
            }

            .lighten {
                color: var(--watermark-text-color) !important;
            }

            .icon-size {
                font-size: 500% !important;
            }
        `,
    ];

    render() {
        const hasTags = this._tagCards.length > 0;
        const hasFilteredTags = this._filteredTagCards.length > 0;
        const isSearching = this._filterShowing && this._searchValue.trim();

        if (!hasTags) {
            return html`
                <header
                    class="padded spacing horizontal center-aligning layout"
                    ?hidden=${this._filterShowing}
                >
                    <pl-button
                        class="transparent skinny stretch menu-button header-title"
                        @click=${() =>
                            this.dispatchEvent(new CustomEvent("toggle-menu", { composed: true, bubbles: true }))}
                    >
                        <div
                            class="half-margined fill-horizontally horizontal spacing center-aligning layout text-left-aligning"
                        >
                            <pl-icon icon="tags-${app.effectiveTheme}"></pl-icon>
                            <div class="stretch collapse ellipsis">${$l("Tags")}</div>
                        </div>
                    </pl-button>

                    <div class="horizontal layout">
                        <pl-button class="slim transparent" @click=${() => this.search()}>
                            <pl-icon icon="search"></pl-icon>
                        </pl-button>
                    </div>
                </header>

                <header
                    class="padded horizontal center-aligning layout"
                    ?hidden=${!this._filterShowing}
                >
                    <pl-input
                        class="slim stretch transparent"
                        .placeholder=${$l("Type To Search")}
                        id="filterInput"
                        select-on-focus
                        @input=${this._onSearchInput}
                        @escape=${this.cancelSearch}
                    >
                        <pl-icon slot="before" class="left-margined left-padded subtle small" icon="search"></pl-icon>

                        <pl-button slot="after" class="slim transparent" @click=${() => this.cancelSearch()}>
                            <pl-icon icon="cancel"></pl-icon>
                        </pl-button>
                    </pl-input>
                </header>

                <div class="no-tags">
                    <pl-icon icon="tags-${app.effectiveTheme}" class="no-tags-icon"></pl-icon>
                    <div class="no-tags-text">${$l("No Tags Available")}</div>
                    <div class="no-tags-subtext">${$l("Create some items with tags to see them here")}</div>
                </div>
            `;
        }

        return html`
            <header
                class="padded spacing horizontal center-aligning layout"
                ?hidden=${this._filterShowing}
            >
                <pl-button
                    class="transparent skinny stretch menu-button header-title"
                    @click=${() =>
                        this.dispatchEvent(new CustomEvent("toggle-menu", { composed: true, bubbles: true }))}
                >
                    <div
                        class="half-margined fill-horizontally horizontal spacing center-aligning layout text-left-aligning"
                    >
                        <pl-icon icon="tags-${app.effectiveTheme}"></pl-icon>
                        <div class="stretch collapse ellipsis">${$l("Tags")}</div>
                    </div>
                </pl-button>

                <div class="horizontal layout">
                    <pl-button class="slim transparent" @click=${() => this.search()}>
                        <pl-icon icon="search"></pl-icon>
                    </pl-button>
                </div>
            </header>

            <header
                class="padded horizontal center-aligning layout"
                ?hidden=${!this._filterShowing}
            >
                <pl-input
                    class="slim stretch transparent"
                    .placeholder=${$l("Type To Search")}
                    id="filterInput"
                    select-on-focus
                    @input=${this._onSearchInput}
                    @escape=${this.cancelSearch}
                >
                    <pl-icon slot="before" class="left-margined left-padded subtle small" icon="search"></pl-icon>

                    <pl-button slot="after" class="slim transparent" @click=${() => this.cancelSearch()}>
                        <pl-icon icon="cancel"></pl-icon>
                    </pl-button>
                </pl-input>
            </header>

            ${isSearching && !hasFilteredTags
                ? html`
                    <div class="no-search-results">
                        <pl-icon
                            icon="search"
                            class="enormous thin subtle lighten icon-size"
                        ></pl-icon>
                        <div class="lighten">${$l("Your search did not match any items.")}</div>
                    </div>
                `
                : html`
                    <div class="content">
                        <div class="tags-grid">
                            ${this._filteredTagCards.map(tag => html`
                                <div 
                                    class="tag-card ${this.selectedTag === tag.name ? 'selected' : ''}" 
                                    @click=${() => this._onTagClick(tag.name)}
                                >
                                    <pl-icon icon="tag" class="tag-icon"></pl-icon>
                                    <div class="tag-info">
                                        <div class="tag-name">${tag.name}</div>
                                        <div class="tag-count">${$l("{0} items", tag.count.toString())}</div>
                                    </div>
                                </div>
                            `)}
                        </div>
                    </div>
                `
            }
        `;
    }
}

@customElement("pl-vault-cards")
export class VaultCards extends StateMixin(LitElement) {
    @state()
    private _vaults: any[] = [];

    @property()
    selectedTag: string | null = null;

    async stateChanged() {
        this._updateVaults();
    }

    private _updateVaults() {
        if (!this.selectedTag) {
            this._vaults = [];
            return;
        }
        // Get all vaults that have at least one item with the selected tag
        this._vaults = this.state.vaults.filter(vault =>
            vault.items.some(item => item.tags.includes(this.selectedTag!))
        );
    }

    private _renderVault(vault: any, index: number) {
        // This should match the render logic for vaults in the all vaults view
        return html`
            <div class="list-item center-aligning horizontal layout" @click=${() => this._onVaultClick(vault.id)}>
                <div class="fullbleed click" style="border-radius: inherit"></div>
                <pl-icon icon="vault" class="vault-icon"></pl-icon>
                <div class="vault-info stretch collapse">
                    <div class="vault-name ellipsis semibold">${vault.name}</div>
                    <div class="vault-meta tiny subtle">${vault.items.length} items</div>
                </div>
                <pl-icon icon="chevron-right" class="vault-arrow"></pl-icon>
            </div>
        `;
    }

    private _onVaultClick(vaultId: string) {
        this.dispatchEvent(new CustomEvent("vault-selected", { 
            detail: { vaultId },
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
            .content {
                flex: 1;
                overflow-y: auto;
            }
            .list-item {
                background: #FAFAFB;
                overflow: hidden;
                border-radius: 8px;
                margin-bottom: 24px;
                display: flex;
                align-items: center;
                cursor: pointer;
                transition: background-color 0.2s ease;
            }
            .list-item:hover {
                background: var(--color-shade-1);
            }
            .vault-icon {
                color: var(--color-highlight);
                font-size: 1.5em;
                margin: 0 1em 0 0.5em;
                flex-shrink: 0;
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
            .vault-meta {
                font-size: 0.9em;
                color: var(--color-shade-2);
            }
            .vault-arrow {
                color: var(--color-shade-2);
                font-size: 1.2em;
                margin-left: 0.5em;
                flex-shrink: 0;
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
            .no-vaults-subtext {
                font-size: 0.9em;
                opacity: 0.7;
            }
            pl-virtual-list {
                width: 90%;
                min-height: 124px;
                margin: 0 auto;
                border-radius: 8px;
            }
        `,
    ];

    render() {
        if (!this.selectedTag) {
            return html`
                <div class="no-vaults">
                    <pl-icon icon="vault" class="no-vaults-icon"></pl-icon>
                    <div class="no-vaults-text">${$l("Select a tag to see vaults")}</div>
                    <div class="no-vaults-subtext">${$l("Click on a tag to view vaults containing items with that tag")}</div>
                </div>
            `;
        }
        if (this._vaults.length === 0) {
            return html`
                <div class="no-vaults">
                    <pl-icon icon="vault" class="no-vaults-icon"></pl-icon>
                    <div class="no-vaults-text">${$l("No vaults found")}</div>
                    <div class="no-vaults-subtext">${$l("No vaults contain items with the selected tag")}</div>
                </div>
            `;
        }
        return html`
            <div class="content">
                <pl-virtual-list
                    .data=${this._vaults}
                    .itemHeight=${80}
                    .renderItem=${this._renderVault.bind(this)}
                    .guard=${(vault: any) => [vault.id, vault.name, vault.items.length]}
                ></pl-virtual-list>
            </div>
        `;
    }
}

@customElement("pl-tags-view")
export class TagsView extends Routing(StateMixin(View)) {
    routePattern = /^tags(?:\/([^\/]+))?/;

    @property()
    selectedTag: string | null = null;

    private _onTagSelected(e: CustomEvent) {
        const { tag } = e.detail;
        this.selectedTag = tag;
    }

    render() {
        return html`
            <div class="three-pane-layout">
                <!-- Middle Pane: Tag Cards (always visible) -->
                <div class="middle-pane">
                    <pl-tag-cards 
                        @tag-selected=${this._onTagSelected}
                        .selectedTag=${this.selectedTag}
                    ></pl-tag-cards>
                </div>
                <!-- Right Pane: Vaults containing the selected tag -->
                <div class="right-pane">
                    ${this.selectedTag
                        ? html`<pl-vault-cards .selectedTag=${this.selectedTag}></pl-vault-cards>`
                        : html`<div class="empty-right-pane"></div>`}
                </div>
            </div>
        `;
    }

    static styles = [
        css`
            .three-pane-layout {
                display: flex;
                height: 100%;
            }
            .middle-pane {
                flex: 1 1 0;
                min-width: 300px;
                max-width: 400px;
                border-right: 1px solid var(--border-color);
                overflow-y: auto;
                background: var(--color-background);
            }
            .right-pane {
                flex: 2 1 0;
                min-width: 0;
                overflow-y: auto;
                background: var(--color-background);
            }
            .empty-right-pane {
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--color-shade-2);
                font-size: 1.2em;
            }
        `
    ];
}