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
    @property()
    selectedTag: string = "";

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
        for (const vault of this.state.vaults) {
            for (const item of vault.items) {
                for (const tag of item.tags) {
                    tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
                }
            }
        }
        this._tagCards = Array.from(tagCounts.entries())
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => a.name.localeCompare(b.name));
        this._filterTags();
    }

    private _onTagClick(tagName: string) {
        this.dispatchEvent(
            new CustomEvent("tag-selected", {
                detail: { tagName },
                bubbles: true,
                composed: true,
            })
        );
    }

    async search(val?: string, focus = true) {
        this._filterShowing = true;
        await this.updateComplete;
        setTimeout(() => {
            if (val && val !== this._searchValue) {
                this._searchValue = val;
                if (this._filterInput) {
                    this._filterInput.value = val;
                }
                this._filterTags();
            } else if (this._filterInput) {
                this._filterInput.value = this._searchValue;
            }
            if (focus && this._filterInput) {
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
        if (this._filterInput) {
            this._filterInput.blur();
        }
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

    private _updateItems() {
        if (this._filterInput) {
            this._searchValue = this._filterInput.value || "";
            this._filterTags();
        }
    }

    static styles = [
        shared,
        css`
            :host {
                display: block;
                height: 100%;
                background: var(--color-background);
            }

            header {
                border-bottom: 1px solid var(--border-color);
                background: var(--color-background);
            }

            .content {
                padding: 1em;
            }

            .tags-grid {
                display: grid;
                gap: 1em;
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            }

            .tag-card {
                display: flex;
                align-items: center;
                padding: 1em;
                border: 1px solid var(--border-color);
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.2s ease;
                background: var(--color-background);
            }

            .tag-card:hover {
                border-color: var(--color-highlight);
                background: var(--color-shade-1);
            }

            .tag-card.selected {
                border-color: var(--color-highlight);
                background: var(--color-highlight);
                color: var(--color-background);
            }

            .tag-icon {
                margin-right: 0.8em;
                font-size: 1.2em;
            }

            .tag-info {
                flex: 1;
            }

            .tag-name {
                font-weight: 500;
                margin-bottom: 0.2em;
            }

            .tag-count {
                font-size: 0.9em;
                opacity: 0.7;
            }

            .no-tags {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100%;
                padding: 2em;
                text-align: center;
            }

            .no-tags-icon {
                font-size: 4em;
                margin-bottom: 1em;
                opacity: 0.5;
            }

            .no-tags-text {
                font-size: 1.2em;
                margin-bottom: 0.5em;
            }

            .no-tags-subtext {
                opacity: 0.7;
            }

            .no-results {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100%;
                padding: 2em;
                text-align: center;
            }

            .no-results-icon {
                font-size: 4em;
                margin-bottom: 1em;
                opacity: 0.5;
            }

            .no-results-text {
                font-size: 1.2em;
                opacity: 0.7;
            }

            pl-input {
                border: 1px solid var(--border-color);
                border-radius: 4px;
                background: var(--color-background);
            }

            pl-input:focus-within {
                border-color: var(--color-highlight);
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
                        @input=${this._updateItems}
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
                    @input=${this._updateItems}
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
                    <div class="no-results">
                        <pl-icon icon="search" class="no-results-icon"></pl-icon>
                        <div class="no-results-text">${$l("Your search did not match any items.")}</div>
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

@customElement("pl-tags-view")
export class TagsView extends Routing(StateMixin(LitElement)) {
    routePattern = /^tags(?:\/([^\/]+))?/;

    @state()
    private selectedTag: string = "";

    async handleRoute([tagName]: [string]) {
        this.selectedTag = tagName || "";
    }

    private _onTagSelected(e: CustomEvent) {
        const tagName = e.detail.tagName;
        this.selectedTag = tagName;
        // Update the URL to reflect the selected tag
        this.go(`tags/${tagName}`, undefined, undefined, true);
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
                        : html`
                            <div class="empty-right-pane">
                                <pl-icon icon="vault-large-${app.effectiveTheme}" class="enormous regular icon-size"></pl-icon>
                                <div class="lighten">${$l("Select a tag to see vaults")}</div>
                            </div>
                        `}
                </div>
            </div>
        `;
    }

    static styles = [
        shared,
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
                flex-direction: column;
                align-items: center;
                justify-content: center;
                color: var(--color-shade-2);
                font-size: 1.2em;
            }
            .lighten {
                color: var(--watermark-text-color) !important;
            }
            .icon-size {
                font-size: 500% !important;
            }
        `,
    ];
}