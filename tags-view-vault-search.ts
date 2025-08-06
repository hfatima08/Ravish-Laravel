import { View } from "./view";
import { StateMixin } from "../mixins/state";
import { Routing } from "../mixins/routing";
import { ItemsList } from "./items-list";
import "./item-view";
import { customElement, property, query, state } from "lit/decorators.js";
import { html, css, LitElement } from "lit";
import { router } from "../globals";
import { translate as $l } from "@padloc/locale/src/translate";
import { app } from "../globals";
import { shared } from "../styles";
import "./icon";
import "./button";
import "./input";

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
                `
            }
        `;
    }
}

@customElement("pl-tags-view")
export class TagsView extends Routing(StateMixin(View)) {
    routePattern = /^tags(?:\/([^\/]+))?/;

    @property()
    selectedTag: string | null = null;

    @query("pl-items-list")
    private _list: ItemsList;

    async handleRoute([tagName]: [string]) {
        this.selectedTag = tagName || null;

        if (this.active) {
            if (tagName) {
                // If a tag is selected, show items for that tag
                this._list?.cancelSearch();
            }
        }
    }

    private _onTagSelected(e: CustomEvent) {
        const { tag } = e.detail;
        router.go(`tags/${tag}`);
    }

    render() {
        return html`
            <div class="fullbleed pane layout ${!!this.selectedTag ? "open" : ""}">
                <pl-tag-cards 
                    @tag-selected=${this._onTagSelected}
                    ?hidden=${!!this.selectedTag}
                ></pl-tag-cards>

                <pl-items-list 
                    .selected=${""} 
                    .filter=${this.selectedTag ? { tag: this.selectedTag } : undefined}
                    ?hidden=${!this.selectedTag}
                ></pl-items-list>

                <pl-item-view ?hidden=${!this.selectedTag}></pl-item-view>
            </div>
        `;
    }
}