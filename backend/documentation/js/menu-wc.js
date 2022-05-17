'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">backend documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-47fe409209fc8bf7a097e5f5945ed1a56b032ffbb2d2d81d834fef27d6cef8b793f788c0c8cc779aa89773cc36025701cd46de9e6855b6a961a9e6a8d3080d06"' : 'data-target="#xs-controllers-links-module-AppModule-47fe409209fc8bf7a097e5f5945ed1a56b032ffbb2d2d81d834fef27d6cef8b793f788c0c8cc779aa89773cc36025701cd46de9e6855b6a961a9e6a8d3080d06"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-47fe409209fc8bf7a097e5f5945ed1a56b032ffbb2d2d81d834fef27d6cef8b793f788c0c8cc779aa89773cc36025701cd46de9e6855b6a961a9e6a8d3080d06"' :
                                            'id="xs-controllers-links-module-AppModule-47fe409209fc8bf7a097e5f5945ed1a56b032ffbb2d2d81d834fef27d6cef8b793f788c0c8cc779aa89773cc36025701cd46de9e6855b6a961a9e6a8d3080d06"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/ArticleController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ArticleController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-47fe409209fc8bf7a097e5f5945ed1a56b032ffbb2d2d81d834fef27d6cef8b793f788c0c8cc779aa89773cc36025701cd46de9e6855b6a961a9e6a8d3080d06"' : 'data-target="#xs-injectables-links-module-AppModule-47fe409209fc8bf7a097e5f5945ed1a56b032ffbb2d2d81d834fef27d6cef8b793f788c0c8cc779aa89773cc36025701cd46de9e6855b6a961a9e6a8d3080d06"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-47fe409209fc8bf7a097e5f5945ed1a56b032ffbb2d2d81d834fef27d6cef8b793f788c0c8cc779aa89773cc36025701cd46de9e6855b6a961a9e6a8d3080d06"' :
                                        'id="xs-injectables-links-module-AppModule-47fe409209fc8bf7a097e5f5945ed1a56b032ffbb2d2d81d834fef27d6cef8b793f788c0c8cc779aa89773cc36025701cd46de9e6855b6a961a9e6a8d3080d06"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ArticleService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ArticleService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ArticleModule.html" data-type="entity-link" >ArticleModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ArticleModule-a0176eb9354693d5166d7b183a777c579744d9602ff47499f0dfa6b8c0b027a862b7ea530efb22b6dab3a3dd6b94a59d1d3dd3ead54536f76b84b133e2a85c9c"' : 'data-target="#xs-controllers-links-module-ArticleModule-a0176eb9354693d5166d7b183a777c579744d9602ff47499f0dfa6b8c0b027a862b7ea530efb22b6dab3a3dd6b94a59d1d3dd3ead54536f76b84b133e2a85c9c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ArticleModule-a0176eb9354693d5166d7b183a777c579744d9602ff47499f0dfa6b8c0b027a862b7ea530efb22b6dab3a3dd6b94a59d1d3dd3ead54536f76b84b133e2a85c9c"' :
                                            'id="xs-controllers-links-module-ArticleModule-a0176eb9354693d5166d7b183a777c579744d9602ff47499f0dfa6b8c0b027a862b7ea530efb22b6dab3a3dd6b94a59d1d3dd3ead54536f76b84b133e2a85c9c"' }>
                                            <li class="link">
                                                <a href="controllers/ArticleController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ArticleController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ArticleModule-a0176eb9354693d5166d7b183a777c579744d9602ff47499f0dfa6b8c0b027a862b7ea530efb22b6dab3a3dd6b94a59d1d3dd3ead54536f76b84b133e2a85c9c"' : 'data-target="#xs-injectables-links-module-ArticleModule-a0176eb9354693d5166d7b183a777c579744d9602ff47499f0dfa6b8c0b027a862b7ea530efb22b6dab3a3dd6b94a59d1d3dd3ead54536f76b84b133e2a85c9c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ArticleModule-a0176eb9354693d5166d7b183a777c579744d9602ff47499f0dfa6b8c0b027a862b7ea530efb22b6dab3a3dd6b94a59d1d3dd3ead54536f76b84b133e2a85c9c"' :
                                        'id="xs-injectables-links-module-ArticleModule-a0176eb9354693d5166d7b183a777c579744d9602ff47499f0dfa6b8c0b027a862b7ea530efb22b6dab3a3dd6b94a59d1d3dd3ead54536f76b84b133e2a85c9c"' }>
                                        <li class="link">
                                            <a href="injectables/ArticleService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ArticleService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AssetsModule.html" data-type="entity-link" >AssetsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AssetsModule-f567bde477514f8b052f843ce81caf152374dbc1da4ca7f86624fad2f0f104b44cdaeeff5e48809c736c10e03b0be25e5e6ca1539a94043c2431997672be7d03"' : 'data-target="#xs-controllers-links-module-AssetsModule-f567bde477514f8b052f843ce81caf152374dbc1da4ca7f86624fad2f0f104b44cdaeeff5e48809c736c10e03b0be25e5e6ca1539a94043c2431997672be7d03"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AssetsModule-f567bde477514f8b052f843ce81caf152374dbc1da4ca7f86624fad2f0f104b44cdaeeff5e48809c736c10e03b0be25e5e6ca1539a94043c2431997672be7d03"' :
                                            'id="xs-controllers-links-module-AssetsModule-f567bde477514f8b052f843ce81caf152374dbc1da4ca7f86624fad2f0f104b44cdaeeff5e48809c736c10e03b0be25e5e6ca1539a94043c2431997672be7d03"' }>
                                            <li class="link">
                                                <a href="controllers/AssetsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AssetsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AssetsModule-f567bde477514f8b052f843ce81caf152374dbc1da4ca7f86624fad2f0f104b44cdaeeff5e48809c736c10e03b0be25e5e6ca1539a94043c2431997672be7d03"' : 'data-target="#xs-injectables-links-module-AssetsModule-f567bde477514f8b052f843ce81caf152374dbc1da4ca7f86624fad2f0f104b44cdaeeff5e48809c736c10e03b0be25e5e6ca1539a94043c2431997672be7d03"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AssetsModule-f567bde477514f8b052f843ce81caf152374dbc1da4ca7f86624fad2f0f104b44cdaeeff5e48809c736c10e03b0be25e5e6ca1539a94043c2431997672be7d03"' :
                                        'id="xs-injectables-links-module-AssetsModule-f567bde477514f8b052f843ce81caf152374dbc1da4ca7f86624fad2f0f104b44cdaeeff5e48809c736c10e03b0be25e5e6ca1539a94043c2431997672be7d03"' }>
                                        <li class="link">
                                            <a href="injectables/AssetsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AssetsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthModule-f2808cf78a872f6c15290083b44dedf0946bad897d1750c2317f010d8ac432afb5e23485aa63f3cfe5b83bab3d3395aeda3c760e2d509b0cfa7957b8d7294e6a"' : 'data-target="#xs-controllers-links-module-AuthModule-f2808cf78a872f6c15290083b44dedf0946bad897d1750c2317f010d8ac432afb5e23485aa63f3cfe5b83bab3d3395aeda3c760e2d509b0cfa7957b8d7294e6a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-f2808cf78a872f6c15290083b44dedf0946bad897d1750c2317f010d8ac432afb5e23485aa63f3cfe5b83bab3d3395aeda3c760e2d509b0cfa7957b8d7294e6a"' :
                                            'id="xs-controllers-links-module-AuthModule-f2808cf78a872f6c15290083b44dedf0946bad897d1750c2317f010d8ac432afb5e23485aa63f3cfe5b83bab3d3395aeda3c760e2d509b0cfa7957b8d7294e6a"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-f2808cf78a872f6c15290083b44dedf0946bad897d1750c2317f010d8ac432afb5e23485aa63f3cfe5b83bab3d3395aeda3c760e2d509b0cfa7957b8d7294e6a"' : 'data-target="#xs-injectables-links-module-AuthModule-f2808cf78a872f6c15290083b44dedf0946bad897d1750c2317f010d8ac432afb5e23485aa63f3cfe5b83bab3d3395aeda3c760e2d509b0cfa7957b8d7294e6a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-f2808cf78a872f6c15290083b44dedf0946bad897d1750c2317f010d8ac432afb5e23485aa63f3cfe5b83bab3d3395aeda3c760e2d509b0cfa7957b8d7294e6a"' :
                                        'id="xs-injectables-links-module-AuthModule-f2808cf78a872f6c15290083b44dedf0946bad897d1750c2317f010d8ac432afb5e23485aa63f3cfe5b83bab3d3395aeda3c760e2d509b0cfa7957b8d7294e6a"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CourseModule.html" data-type="entity-link" >CourseModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-CourseModule-595e591274a962d75cb6b94db73d8a8559d21eb8a6a30efa81da5d04652f6f74a604f4c04e641cb77747ef2077ebe41ccabb98b88f214b88077d04731368ebbf"' : 'data-target="#xs-controllers-links-module-CourseModule-595e591274a962d75cb6b94db73d8a8559d21eb8a6a30efa81da5d04652f6f74a604f4c04e641cb77747ef2077ebe41ccabb98b88f214b88077d04731368ebbf"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CourseModule-595e591274a962d75cb6b94db73d8a8559d21eb8a6a30efa81da5d04652f6f74a604f4c04e641cb77747ef2077ebe41ccabb98b88f214b88077d04731368ebbf"' :
                                            'id="xs-controllers-links-module-CourseModule-595e591274a962d75cb6b94db73d8a8559d21eb8a6a30efa81da5d04652f6f74a604f4c04e641cb77747ef2077ebe41ccabb98b88f214b88077d04731368ebbf"' }>
                                            <li class="link">
                                                <a href="controllers/CourseController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CourseController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CourseModule-595e591274a962d75cb6b94db73d8a8559d21eb8a6a30efa81da5d04652f6f74a604f4c04e641cb77747ef2077ebe41ccabb98b88f214b88077d04731368ebbf"' : 'data-target="#xs-injectables-links-module-CourseModule-595e591274a962d75cb6b94db73d8a8559d21eb8a6a30efa81da5d04652f6f74a604f4c04e641cb77747ef2077ebe41ccabb98b88f214b88077d04731368ebbf"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CourseModule-595e591274a962d75cb6b94db73d8a8559d21eb8a6a30efa81da5d04652f6f74a604f4c04e641cb77747ef2077ebe41ccabb98b88f214b88077d04731368ebbf"' :
                                        'id="xs-injectables-links-module-CourseModule-595e591274a962d75cb6b94db73d8a8559d21eb8a6a30efa81da5d04652f6f74a604f4c04e641cb77747ef2077ebe41ccabb98b88f214b88077d04731368ebbf"' }>
                                        <li class="link">
                                            <a href="injectables/CourseService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CourseService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DatabaseModule.html" data-type="entity-link" >DatabaseModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-DatabaseModule-e5f9ab5c0eb3c9735c12622f214bc4b5ce9eff76869a3bb24860557d99f48cf8a5643974c1a1ede4766313e36ac1a830e5e0aea94909d125ff21dc0ebf6fac87"' : 'data-target="#xs-injectables-links-module-DatabaseModule-e5f9ab5c0eb3c9735c12622f214bc4b5ce9eff76869a3bb24860557d99f48cf8a5643974c1a1ede4766313e36ac1a830e5e0aea94909d125ff21dc0ebf6fac87"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DatabaseModule-e5f9ab5c0eb3c9735c12622f214bc4b5ce9eff76869a3bb24860557d99f48cf8a5643974c1a1ede4766313e36ac1a830e5e0aea94909d125ff21dc0ebf6fac87"' :
                                        'id="xs-injectables-links-module-DatabaseModule-e5f9ab5c0eb3c9735c12622f214bc4b5ce9eff76869a3bb24860557d99f48cf8a5643974c1a1ede4766313e36ac1a830e5e0aea94909d125ff21dc0ebf6fac87"' }>
                                        <li class="link">
                                            <a href="injectables/DatabaseService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DatabaseService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FileUploadModule.html" data-type="entity-link" >FileUploadModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-FileUploadModule-87299ddfa62b1993d647f6f95335f3d4fd2e19023dff7adde2957a6aaeb9eaaa0f67b5113f652fcb327933048cad0e572719630150342d340c600deb1fe629a7"' : 'data-target="#xs-controllers-links-module-FileUploadModule-87299ddfa62b1993d647f6f95335f3d4fd2e19023dff7adde2957a6aaeb9eaaa0f67b5113f652fcb327933048cad0e572719630150342d340c600deb1fe629a7"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-FileUploadModule-87299ddfa62b1993d647f6f95335f3d4fd2e19023dff7adde2957a6aaeb9eaaa0f67b5113f652fcb327933048cad0e572719630150342d340c600deb1fe629a7"' :
                                            'id="xs-controllers-links-module-FileUploadModule-87299ddfa62b1993d647f6f95335f3d4fd2e19023dff7adde2957a6aaeb9eaaa0f67b5113f652fcb327933048cad0e572719630150342d340c600deb1fe629a7"' }>
                                            <li class="link">
                                                <a href="controllers/FileUploadController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FileUploadController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-FileUploadModule-87299ddfa62b1993d647f6f95335f3d4fd2e19023dff7adde2957a6aaeb9eaaa0f67b5113f652fcb327933048cad0e572719630150342d340c600deb1fe629a7"' : 'data-target="#xs-injectables-links-module-FileUploadModule-87299ddfa62b1993d647f6f95335f3d4fd2e19023dff7adde2957a6aaeb9eaaa0f67b5113f652fcb327933048cad0e572719630150342d340c600deb1fe629a7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FileUploadModule-87299ddfa62b1993d647f6f95335f3d4fd2e19023dff7adde2957a6aaeb9eaaa0f67b5113f652fcb327933048cad0e572719630150342d340c600deb1fe629a7"' :
                                        'id="xs-injectables-links-module-FileUploadModule-87299ddfa62b1993d647f6f95335f3d4fd2e19023dff7adde2957a6aaeb9eaaa0f67b5113f652fcb327933048cad0e572719630150342d340c600deb1fe629a7"' }>
                                        <li class="link">
                                            <a href="injectables/FileUploadService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FileUploadService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/HelperModule.html" data-type="entity-link" >HelperModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-HelperModule-dbe5e507e80763c5274551492aa706dcd28f0a0dc7a3f7678b27de1f00332efc708c81844307b88cdcf0f0e56823de1ca372d04510045812ab09233b3b4dd732"' : 'data-target="#xs-injectables-links-module-HelperModule-dbe5e507e80763c5274551492aa706dcd28f0a0dc7a3f7678b27de1f00332efc708c81844307b88cdcf0f0e56823de1ca372d04510045812ab09233b3b4dd732"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-HelperModule-dbe5e507e80763c5274551492aa706dcd28f0a0dc7a3f7678b27de1f00332efc708c81844307b88cdcf0f0e56823de1ca372d04510045812ab09233b3b4dd732"' :
                                        'id="xs-injectables-links-module-HelperModule-dbe5e507e80763c5274551492aa706dcd28f0a0dc7a3f7678b27de1f00332efc708c81844307b88cdcf0f0e56823de1ca372d04510045812ab09233b3b4dd732"' }>
                                        <li class="link">
                                            <a href="injectables/HelperService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HelperService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MailModule.html" data-type="entity-link" >MailModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-MailModule-e4eee44f1140f8286bd7999b7502b5f5dcf99a3bbe01a46166054b5606cbbe8f1ea04dcc1ff52175e2a97c8d8f0f6ae67bde05ae2933d6e6e0d03e60ce53d1ee"' : 'data-target="#xs-controllers-links-module-MailModule-e4eee44f1140f8286bd7999b7502b5f5dcf99a3bbe01a46166054b5606cbbe8f1ea04dcc1ff52175e2a97c8d8f0f6ae67bde05ae2933d6e6e0d03e60ce53d1ee"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MailModule-e4eee44f1140f8286bd7999b7502b5f5dcf99a3bbe01a46166054b5606cbbe8f1ea04dcc1ff52175e2a97c8d8f0f6ae67bde05ae2933d6e6e0d03e60ce53d1ee"' :
                                            'id="xs-controllers-links-module-MailModule-e4eee44f1140f8286bd7999b7502b5f5dcf99a3bbe01a46166054b5606cbbe8f1ea04dcc1ff52175e2a97c8d8f0f6ae67bde05ae2933d6e6e0d03e60ce53d1ee"' }>
                                            <li class="link">
                                                <a href="controllers/MailController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-MailModule-e4eee44f1140f8286bd7999b7502b5f5dcf99a3bbe01a46166054b5606cbbe8f1ea04dcc1ff52175e2a97c8d8f0f6ae67bde05ae2933d6e6e0d03e60ce53d1ee"' : 'data-target="#xs-injectables-links-module-MailModule-e4eee44f1140f8286bd7999b7502b5f5dcf99a3bbe01a46166054b5606cbbe8f1ea04dcc1ff52175e2a97c8d8f0f6ae67bde05ae2933d6e6e0d03e60ce53d1ee"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MailModule-e4eee44f1140f8286bd7999b7502b5f5dcf99a3bbe01a46166054b5606cbbe8f1ea04dcc1ff52175e2a97c8d8f0f6ae67bde05ae2933d6e6e0d03e60ce53d1ee"' :
                                        'id="xs-injectables-links-module-MailModule-e4eee44f1140f8286bd7999b7502b5f5dcf99a3bbe01a46166054b5606cbbe8f1ea04dcc1ff52175e2a97c8d8f0f6ae67bde05ae2933d6e6e0d03e60ce53d1ee"' }>
                                        <li class="link">
                                            <a href="injectables/MailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RefreshTokenModule.html" data-type="entity-link" >RefreshTokenModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-RefreshTokenModule-e0a4bb093412bc613c8acb42395dc5459f197ca69ef125da755127c1a375cb8e82f7cee2d0e4f9f2be3d8dc7d1819e1e085b2b8ac4bbb8b5575e8a08019c60b7"' : 'data-target="#xs-injectables-links-module-RefreshTokenModule-e0a4bb093412bc613c8acb42395dc5459f197ca69ef125da755127c1a375cb8e82f7cee2d0e4f9f2be3d8dc7d1819e1e085b2b8ac4bbb8b5575e8a08019c60b7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RefreshTokenModule-e0a4bb093412bc613c8acb42395dc5459f197ca69ef125da755127c1a375cb8e82f7cee2d0e4f9f2be3d8dc7d1819e1e085b2b8ac4bbb8b5575e8a08019c60b7"' :
                                        'id="xs-injectables-links-module-RefreshTokenModule-e0a4bb093412bc613c8acb42395dc5459f197ca69ef125da755127c1a375cb8e82f7cee2d0e4f9f2be3d8dc7d1819e1e085b2b8ac4bbb8b5575e8a08019c60b7"' }>
                                        <li class="link">
                                            <a href="injectables/JwtRefreshTokenStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtRefreshTokenStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RefreshTokenService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RefreshTokenService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SchoolAdminModule.html" data-type="entity-link" >SchoolAdminModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-SchoolAdminModule-3452a4a3f5b90a98e22f3edabeb103c79bfee1d2b42639c7d85d7b90d39380bb6015cb12bd73d67ba8724398b6b79f817a7c205381c91b5e469553361843f43a"' : 'data-target="#xs-controllers-links-module-SchoolAdminModule-3452a4a3f5b90a98e22f3edabeb103c79bfee1d2b42639c7d85d7b90d39380bb6015cb12bd73d67ba8724398b6b79f817a7c205381c91b5e469553361843f43a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SchoolAdminModule-3452a4a3f5b90a98e22f3edabeb103c79bfee1d2b42639c7d85d7b90d39380bb6015cb12bd73d67ba8724398b6b79f817a7c205381c91b5e469553361843f43a"' :
                                            'id="xs-controllers-links-module-SchoolAdminModule-3452a4a3f5b90a98e22f3edabeb103c79bfee1d2b42639c7d85d7b90d39380bb6015cb12bd73d67ba8724398b6b79f817a7c205381c91b5e469553361843f43a"' }>
                                            <li class="link">
                                                <a href="controllers/SchoolAdminController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SchoolAdminController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SchoolAdminModule-3452a4a3f5b90a98e22f3edabeb103c79bfee1d2b42639c7d85d7b90d39380bb6015cb12bd73d67ba8724398b6b79f817a7c205381c91b5e469553361843f43a"' : 'data-target="#xs-injectables-links-module-SchoolAdminModule-3452a4a3f5b90a98e22f3edabeb103c79bfee1d2b42639c7d85d7b90d39380bb6015cb12bd73d67ba8724398b6b79f817a7c205381c91b5e469553361843f43a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SchoolAdminModule-3452a4a3f5b90a98e22f3edabeb103c79bfee1d2b42639c7d85d7b90d39380bb6015cb12bd73d67ba8724398b6b79f817a7c205381c91b5e469553361843f43a"' :
                                        'id="xs-injectables-links-module-SchoolAdminModule-3452a4a3f5b90a98e22f3edabeb103c79bfee1d2b42639c7d85d7b90d39380bb6015cb12bd73d67ba8724398b6b79f817a7c205381c91b5e469553361843f43a"' }>
                                        <li class="link">
                                            <a href="injectables/SchoolAdminService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SchoolAdminService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/StatisticsModule.html" data-type="entity-link" >StatisticsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-StatisticsModule-99fca8c128c8597108844023c8731beacd1537e341c587efe86aca2ce41e81c3a681045c548ce3a15a2d6109734e360448809a07db1ff13036c3d7bf3c51a29f"' : 'data-target="#xs-controllers-links-module-StatisticsModule-99fca8c128c8597108844023c8731beacd1537e341c587efe86aca2ce41e81c3a681045c548ce3a15a2d6109734e360448809a07db1ff13036c3d7bf3c51a29f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-StatisticsModule-99fca8c128c8597108844023c8731beacd1537e341c587efe86aca2ce41e81c3a681045c548ce3a15a2d6109734e360448809a07db1ff13036c3d7bf3c51a29f"' :
                                            'id="xs-controllers-links-module-StatisticsModule-99fca8c128c8597108844023c8731beacd1537e341c587efe86aca2ce41e81c3a681045c548ce3a15a2d6109734e360448809a07db1ff13036c3d7bf3c51a29f"' }>
                                            <li class="link">
                                                <a href="controllers/StatisticsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StatisticsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-StatisticsModule-99fca8c128c8597108844023c8731beacd1537e341c587efe86aca2ce41e81c3a681045c548ce3a15a2d6109734e360448809a07db1ff13036c3d7bf3c51a29f"' : 'data-target="#xs-injectables-links-module-StatisticsModule-99fca8c128c8597108844023c8731beacd1537e341c587efe86aca2ce41e81c3a681045c548ce3a15a2d6109734e360448809a07db1ff13036c3d7bf3c51a29f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-StatisticsModule-99fca8c128c8597108844023c8731beacd1537e341c587efe86aca2ce41e81c3a681045c548ce3a15a2d6109734e360448809a07db1ff13036c3d7bf3c51a29f"' :
                                        'id="xs-injectables-links-module-StatisticsModule-99fca8c128c8597108844023c8731beacd1537e341c587efe86aca2ce41e81c3a681045c548ce3a15a2d6109734e360448809a07db1ff13036c3d7bf3c51a29f"' }>
                                        <li class="link">
                                            <a href="injectables/StatisticsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StatisticsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/StatusModule.html" data-type="entity-link" >StatusModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-StatusModule-46c1d2a09d23c7eba49c2c5b95a3b309055d11e36abbf8a71134fc285dc14fc94c572f118d93d9a4d2b92753baa3bbaf066184627fe73d6fa9107bb5688abbf1"' : 'data-target="#xs-controllers-links-module-StatusModule-46c1d2a09d23c7eba49c2c5b95a3b309055d11e36abbf8a71134fc285dc14fc94c572f118d93d9a4d2b92753baa3bbaf066184627fe73d6fa9107bb5688abbf1"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-StatusModule-46c1d2a09d23c7eba49c2c5b95a3b309055d11e36abbf8a71134fc285dc14fc94c572f118d93d9a4d2b92753baa3bbaf066184627fe73d6fa9107bb5688abbf1"' :
                                            'id="xs-controllers-links-module-StatusModule-46c1d2a09d23c7eba49c2c5b95a3b309055d11e36abbf8a71134fc285dc14fc94c572f118d93d9a4d2b92753baa3bbaf066184627fe73d6fa9107bb5688abbf1"' }>
                                            <li class="link">
                                                <a href="controllers/StatusController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StatusController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-StatusModule-46c1d2a09d23c7eba49c2c5b95a3b309055d11e36abbf8a71134fc285dc14fc94c572f118d93d9a4d2b92753baa3bbaf066184627fe73d6fa9107bb5688abbf1"' : 'data-target="#xs-injectables-links-module-StatusModule-46c1d2a09d23c7eba49c2c5b95a3b309055d11e36abbf8a71134fc285dc14fc94c572f118d93d9a4d2b92753baa3bbaf066184627fe73d6fa9107bb5688abbf1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-StatusModule-46c1d2a09d23c7eba49c2c5b95a3b309055d11e36abbf8a71134fc285dc14fc94c572f118d93d9a4d2b92753baa3bbaf066184627fe73d6fa9107bb5688abbf1"' :
                                        'id="xs-injectables-links-module-StatusModule-46c1d2a09d23c7eba49c2c5b95a3b309055d11e36abbf8a71134fc285dc14fc94c572f118d93d9a4d2b92753baa3bbaf066184627fe73d6fa9107bb5688abbf1"' }>
                                        <li class="link">
                                            <a href="injectables/StatusService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StatusService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TimezoneModule.html" data-type="entity-link" >TimezoneModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-TimezoneModule-a8c083f0b1349278cbb20c004f6c2807816cf77d9b5a1835f15add30f7cd6d83b09b1fcf2e5200a49bfbc4ebc27506dbfeb9b532d63799d422aa2cb22b5a0807"' : 'data-target="#xs-controllers-links-module-TimezoneModule-a8c083f0b1349278cbb20c004f6c2807816cf77d9b5a1835f15add30f7cd6d83b09b1fcf2e5200a49bfbc4ebc27506dbfeb9b532d63799d422aa2cb22b5a0807"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TimezoneModule-a8c083f0b1349278cbb20c004f6c2807816cf77d9b5a1835f15add30f7cd6d83b09b1fcf2e5200a49bfbc4ebc27506dbfeb9b532d63799d422aa2cb22b5a0807"' :
                                            'id="xs-controllers-links-module-TimezoneModule-a8c083f0b1349278cbb20c004f6c2807816cf77d9b5a1835f15add30f7cd6d83b09b1fcf2e5200a49bfbc4ebc27506dbfeb9b532d63799d422aa2cb22b5a0807"' }>
                                            <li class="link">
                                                <a href="controllers/TimezoneController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TimezoneController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-TimezoneModule-a8c083f0b1349278cbb20c004f6c2807816cf77d9b5a1835f15add30f7cd6d83b09b1fcf2e5200a49bfbc4ebc27506dbfeb9b532d63799d422aa2cb22b5a0807"' : 'data-target="#xs-injectables-links-module-TimezoneModule-a8c083f0b1349278cbb20c004f6c2807816cf77d9b5a1835f15add30f7cd6d83b09b1fcf2e5200a49bfbc4ebc27506dbfeb9b532d63799d422aa2cb22b5a0807"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TimezoneModule-a8c083f0b1349278cbb20c004f6c2807816cf77d9b5a1835f15add30f7cd6d83b09b1fcf2e5200a49bfbc4ebc27506dbfeb9b532d63799d422aa2cb22b5a0807"' :
                                        'id="xs-injectables-links-module-TimezoneModule-a8c083f0b1349278cbb20c004f6c2807816cf77d9b5a1835f15add30f7cd6d83b09b1fcf2e5200a49bfbc4ebc27506dbfeb9b532d63799d422aa2cb22b5a0807"' }>
                                        <li class="link">
                                            <a href="injectables/TimezoneService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TimezoneService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UserModule-f7917b573cca3b2167fd6cd7e60cc782b8b8d24947e0939681b941cb1da4f5e9d703025429ca5b300df48ab343323922fd0f74b50abc790c6da8a87ef22d09fb"' : 'data-target="#xs-controllers-links-module-UserModule-f7917b573cca3b2167fd6cd7e60cc782b8b8d24947e0939681b941cb1da4f5e9d703025429ca5b300df48ab343323922fd0f74b50abc790c6da8a87ef22d09fb"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-f7917b573cca3b2167fd6cd7e60cc782b8b8d24947e0939681b941cb1da4f5e9d703025429ca5b300df48ab343323922fd0f74b50abc790c6da8a87ef22d09fb"' :
                                            'id="xs-controllers-links-module-UserModule-f7917b573cca3b2167fd6cd7e60cc782b8b8d24947e0939681b941cb1da4f5e9d703025429ca5b300df48ab343323922fd0f74b50abc790c6da8a87ef22d09fb"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UserModule-f7917b573cca3b2167fd6cd7e60cc782b8b8d24947e0939681b941cb1da4f5e9d703025429ca5b300df48ab343323922fd0f74b50abc790c6da8a87ef22d09fb"' : 'data-target="#xs-injectables-links-module-UserModule-f7917b573cca3b2167fd6cd7e60cc782b8b8d24947e0939681b941cb1da4f5e9d703025429ca5b300df48ab343323922fd0f74b50abc790c6da8a87ef22d09fb"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-f7917b573cca3b2167fd6cd7e60cc782b8b8d24947e0939681b941cb1da4f5e9d703025429ca5b300df48ab343323922fd0f74b50abc790c6da8a87ef22d09fb"' :
                                        'id="xs-injectables-links-module-UserModule-f7917b573cca3b2167fd6cd7e60cc782b8b8d24947e0939681b941cb1da4f5e9d703025429ca5b300df48ab343323922fd0f74b50abc790c6da8a87ef22d09fb"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UsersModule-83cdfbe1f2f95495ed789a1793e38a6aeaaa0ebf7ea779e883c906eb5ba360b42acea68729f4c428c8034e4415d3f245511c290b3652447c14d229acb7fc3bfd"' : 'data-target="#xs-controllers-links-module-UsersModule-83cdfbe1f2f95495ed789a1793e38a6aeaaa0ebf7ea779e883c906eb5ba360b42acea68729f4c428c8034e4415d3f245511c290b3652447c14d229acb7fc3bfd"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-83cdfbe1f2f95495ed789a1793e38a6aeaaa0ebf7ea779e883c906eb5ba360b42acea68729f4c428c8034e4415d3f245511c290b3652447c14d229acb7fc3bfd"' :
                                            'id="xs-controllers-links-module-UsersModule-83cdfbe1f2f95495ed789a1793e38a6aeaaa0ebf7ea779e883c906eb5ba360b42acea68729f4c428c8034e4415d3f245511c290b3652447c14d229acb7fc3bfd"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UsersModule-83cdfbe1f2f95495ed789a1793e38a6aeaaa0ebf7ea779e883c906eb5ba360b42acea68729f4c428c8034e4415d3f245511c290b3652447c14d229acb7fc3bfd"' : 'data-target="#xs-injectables-links-module-UsersModule-83cdfbe1f2f95495ed789a1793e38a6aeaaa0ebf7ea779e883c906eb5ba360b42acea68729f4c428c8034e4415d3f245511c290b3652447c14d229acb7fc3bfd"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-83cdfbe1f2f95495ed789a1793e38a6aeaaa0ebf7ea779e883c906eb5ba360b42acea68729f4c428c8034e4415d3f245511c290b3652447c14d229acb7fc3bfd"' :
                                        'id="xs-injectables-links-module-UsersModule-83cdfbe1f2f95495ed789a1793e38a6aeaaa0ebf7ea779e883c906eb5ba360b42acea68729f4c428c8034e4415d3f245511c290b3652447c14d229acb7fc3bfd"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#controllers-links"' :
                                'data-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ArticleController.html" data-type="entity-link" >ArticleController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AssetsController.html" data-type="entity-link" >AssetsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CourseController.html" data-type="entity-link" >CourseController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/FileUploadController.html" data-type="entity-link" >FileUploadController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/MailController.html" data-type="entity-link" >MailController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/SchoolAdminController.html" data-type="entity-link" >SchoolAdminController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/StatisticsController.html" data-type="entity-link" >StatisticsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/StatusController.html" data-type="entity-link" >StatusController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/TimezoneController.html" data-type="entity-link" >TimezoneController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UserController.html" data-type="entity-link" >UserController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AddCourseDto.html" data-type="entity-link" >AddCourseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Article.html" data-type="entity-link" >Article</a>
                            </li>
                            <li class="link">
                                <a href="classes/CourseDto.html" data-type="entity-link" >CourseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CourseEntity.html" data-type="entity-link" >CourseEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/CourseEvent.html" data-type="entity-link" >CourseEvent</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetAllCoursesDto.html" data-type="entity-link" >GetAllCoursesDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetEventsDto.html" data-type="entity-link" >GetEventsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/IsArrayUniqueConstraint.html" data-type="entity-link" >IsArrayUniqueConstraint</a>
                            </li>
                            <li class="link">
                                <a href="classes/IsCourseExistConstraint.html" data-type="entity-link" >IsCourseExistConstraint</a>
                            </li>
                            <li class="link">
                                <a href="classes/IsCustomUUIDConstraint.html" data-type="entity-link" >IsCustomUUIDConstraint</a>
                            </li>
                            <li class="link">
                                <a href="classes/IsNameAvailableConstraint.html" data-type="entity-link" >IsNameAvailableConstraint</a>
                            </li>
                            <li class="link">
                                <a href="classes/IsSchoolExistConstraint.html" data-type="entity-link" >IsSchoolExistConstraint</a>
                            </li>
                            <li class="link">
                                <a href="classes/IsUserUUIDExistConstraint.html" data-type="entity-link" >IsUserUUIDExistConstraint</a>
                            </li>
                            <li class="link">
                                <a href="classes/Logger.html" data-type="entity-link" >Logger</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginUserDto.html" data-type="entity-link" >LoginUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RemoveCourseDto.html" data-type="entity-link" >RemoveCourseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Throttler.html" data-type="entity-link" >Throttler</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCourseDto.html" data-type="entity-link" >UpdateCourseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ArticleService.html" data-type="entity-link" >ArticleService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AssetsService.html" data-type="entity-link" >AssetsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CourseService.html" data-type="entity-link" >CourseService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DatabaseService.html" data-type="entity-link" >DatabaseService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FileUploadService.html" data-type="entity-link" >FileUploadService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GeneralConfigService.html" data-type="entity-link" >GeneralConfigService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HelperService.html" data-type="entity-link" >HelperService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtRefreshTokenAuthGuard.html" data-type="entity-link" >JwtRefreshTokenAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtRefreshTokenStrategy.html" data-type="entity-link" >JwtRefreshTokenStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthGuard.html" data-type="entity-link" >LocalAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStrategy.html" data-type="entity-link" >LocalStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MailService.html" data-type="entity-link" >MailService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RefreshTokenService.html" data-type="entity-link" >RefreshTokenService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RequestLogger.html" data-type="entity-link" >RequestLogger</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SchoolAdminService.html" data-type="entity-link" >SchoolAdminService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StatisticsService.html" data-type="entity-link" >StatisticsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StatusService.html" data-type="entity-link" >StatusService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TimezoneService.html" data-type="entity-link" >TimezoneService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/RolesGuard.html" data-type="entity-link" >RolesGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AddClass.html" data-type="entity-link" >AddClass</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddCourse.html" data-type="entity-link" >AddCourse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddDepartment.html" data-type="entity-link" >AddDepartment</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddJoinCode.html" data-type="entity-link" >AddJoinCode</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddSchool.html" data-type="entity-link" >AddSchool</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddUser.html" data-type="entity-link" >AddUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ClassTable.html" data-type="entity-link" >ClassTable</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CourseTable.html" data-type="entity-link" >CourseTable</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CourseUser.html" data-type="entity-link" >CourseUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DatabaseUpdate.html" data-type="entity-link" >DatabaseUpdate</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DecodedJWT.html" data-type="entity-link" >DecodedJWT</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetAllJoinCodes.html" data-type="entity-link" >GetAllJoinCodes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetClasses.html" data-type="entity-link" >GetClasses</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetDepartment.html" data-type="entity-link" >GetDepartment</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetDepartments.html" data-type="entity-link" >GetDepartments</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetFile.html" data-type="entity-link" >GetFile</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/JoinCodeTable.html" data-type="entity-link" >JoinCodeTable</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/JoinSchool.html" data-type="entity-link" >JoinSchool</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LanguageEntry.html" data-type="entity-link" >LanguageEntry</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoginUserData.html" data-type="entity-link" >LoginUserData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RegisterUserData.html" data-type="entity-link" >RegisterUserData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RemoveCourse.html" data-type="entity-link" >RemoveCourse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RemoveDepartment.html" data-type="entity-link" >RemoveDepartment</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RemoveJoinCode.html" data-type="entity-link" >RemoveJoinCode</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RemoveUser.html" data-type="entity-link" >RemoveUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ReturnMessage.html" data-type="entity-link" >ReturnMessage</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ReturnMessage-1.html" data-type="entity-link" >ReturnMessage</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ReturnMessage-2.html" data-type="entity-link" >ReturnMessage</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UpdateClass.html" data-type="entity-link" >UpdateClass</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UpdateCourse.html" data-type="entity-link" >UpdateCourse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UpdateDepartment.html" data-type="entity-link" >UpdateDepartment</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UpdateJoinCode.html" data-type="entity-link" >UpdateJoinCode</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserData.html" data-type="entity-link" >UserData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserPermissions.html" data-type="entity-link" >UserPermissions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserRole.html" data-type="entity-link" >UserRole</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserRoleData.html" data-type="entity-link" >UserRoleData</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});