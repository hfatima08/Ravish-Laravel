import { View } from "./view";
import { StateMixin } from "../mixins/state";
import { Routing } from "../mixins/routing";
import { ItemsList, ItemsFilter } from "./items-list";
import { TagCards } from "./tag-cards";
import "./item-view";
import { customElement, property, query } from "lit/decorators.js";
import { html } from "lit";
import { router } from "../globals";

@customElement("pl-tags-view")
export class TagsView extends Routing(StateMixin(View)) {
    routePattern = /^tags(?:\/([^\/]+))?/;

    @property()
    selectedTag: string | null = null;

    @query("pl-items-list")
    private _list: ItemsList;

    @query("pl-tag-cards")
    private _tagCards: TagCards;

    async handleRoute([tagName]: [string], params: { [prop: string]: string }) {
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