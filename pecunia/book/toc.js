// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><a href="index.html">Introduction</a></li><li class="chapter-item expanded affix "><li class="part-title">Dev Guide</li><li class="chapter-item expanded "><a href="guide/tools/index.html"><strong aria-hidden="true">1.</strong> Installation</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="guide/tools/precommit_commitizen.html"><strong aria-hidden="true">1.1.</strong> Pre-commit // Commitizen</a></li><li class="chapter-item expanded "><a href="guide/tools/checkstyle.html"><strong aria-hidden="true">1.2.</strong> Checkstyle</a></li><li class="chapter-item expanded "><a href="guide/tools/javadoc.html"><strong aria-hidden="true">1.3.</strong> Javadoc</a></li></ol></li><li class="chapter-item expanded "><a href="guide/workflow_git.html"><strong aria-hidden="true">2.</strong> Workflow Git</a></li><li class="chapter-item expanded "><a href="guide/branching_strategy.html"><strong aria-hidden="true">3.</strong> Branching Strategy</a></li><li class="chapter-item expanded affix "><li class="part-title">Ressources pour le Titre</li><li class="chapter-item expanded "><a href="titre/index.html"><strong aria-hidden="true">4.</strong> Informations et Aides</a></li><li class="chapter-item expanded affix "><li class="part-title">Conception</li><li class="chapter-item expanded "><a href="conception/conception_bdd.html"><strong aria-hidden="true">5.</strong> Conception BDD</a></li><li class="chapter-item expanded affix "><li class="part-title">Design System</li><li class="chapter-item expanded "><a href="design_system/index.html"><strong aria-hidden="true">6.</strong> Introduction</a></li><li class="chapter-item expanded "><a href="design_system/gestion_etats_angular/index.html"><strong aria-hidden="true">7.</strong> Gestion des Etats avec Angular</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="design_system/gestion_etats_angular/signals.html"><strong aria-hidden="true">7.1.</strong> Les Signals</a></li><li class="chapter-item expanded "><a href="design_system/gestion_etats_angular/signals_vs_classes.html"><strong aria-hidden="true">7.2.</strong> Paradigme de Gestion: Signals vs Classes</a></li><li class="chapter-item expanded "><a href="design_system/gestion_etats_angular/composants_ui.html"><strong aria-hidden="true">7.3.</strong> Composants UI: pattern signal, input, computed</a></li></ol></li><li class="chapter-item expanded "><a href="design_system/tokens_variables/index.html"><strong aria-hidden="true">8.</strong> Tokens et Variables</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="design_system/tokens_variables/integration_tokens_figma.html"><strong aria-hidden="true">8.1.</strong> Intégrations des tokens Figma</a></li><li class="chapter-item expanded "><a href="design_system/tokens_variables/table_correspondance_couleurs.html"><strong aria-hidden="true">8.2.</strong> Table de correspondance des couleurs</a></li><li class="chapter-item expanded "><a href="design_system/tokens_variables/mixins.html"><strong aria-hidden="true">8.3.</strong> Mixins : gérer les couleurs des themes</a></li></ol></li><li class="chapter-item expanded "><a href="design_system/typographies/index.html"><strong aria-hidden="true">9.</strong> Typographies</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="design_system/typographies/gestion_polices.html"><strong aria-hidden="true">9.1.</strong> Gestions des Polices</a></li><li class="chapter-item expanded "><a href="design_system/typographies/mixin.html"><strong aria-hidden="true">9.2.</strong> Mixin</a></li></ol></li><li class="chapter-item expanded "><a href="design_system/layout/index.html"><strong aria-hidden="true">10.</strong> Layout</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="design_system/layout/mixin_media-query_breakpoint.html"><strong aria-hidden="true">10.1.</strong> Mixin, Media Query et Breakpoint</a></li><li class="chapter-item expanded "><a href="design_system/layout/espacements_margin_padding_radius.html"><strong aria-hidden="true">10.2.</strong> Espacements, margin, padding et radius</a></li><li class="chapter-item expanded "><a href="design_system/layout/flexbox.html"><strong aria-hidden="true">10.3.</strong> Flexbox</a></li><li class="chapter-item expanded "><a href="design_system/layout/shadows.html"><strong aria-hidden="true">10.4.</strong> Shadows</a></li><li class="chapter-item expanded "><a href="design_system/layout/exemple.html"><strong aria-hidden="true">10.5.</strong> Exemple: Un Bouton</a></li></ol></li><li class="chapter-item expanded "><a href="design_system/composants_ui/index.html"><strong aria-hidden="true">11.</strong> Composants UI</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="design_system/composants_ui/icons.html"><strong aria-hidden="true">11.1.</strong> Icons</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="design_system/composants_ui/listes_icons.html"><strong aria-hidden="true">11.1.1.</strong> Listes des Icons</a></li><li class="chapter-item expanded "><a href="design_system/composants_ui/accessibilité.html"><strong aria-hidden="true">11.1.2.</strong> Accessibilité</a></li></ol></li><li class="chapter-item expanded "><a href="design_system/composants_ui/boutons.html"><strong aria-hidden="true">11.2.</strong> Boutons</a></li><li class="chapter-item expanded "><a href="design_system/composants_ui/inputs.html"><strong aria-hidden="true">11.3.</strong> Inputs</a></li></ol></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0].split("?")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
