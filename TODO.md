# TODO - UI & Navigation Enhancement (TurfBook)

## Phase 1: Plan confirmation
- [x] Review existing HTML/CSS/JS for navbar and page structure.

## Phase 2: Implement shared, reusable navigation
- [ ] Add a reusable mobile navbar structure (hamburger button + drawer) to every page.
- [ ] Ensure hamburger → X animated transition (CSS only).
- [ ] Add dark blurred backdrop behind the drawer.
- [ ] Add ARIA attributes: aria-label, aria-expanded, aria-controls.

## Phase 3: Navigation behavior (JS)
- [ ] Implement drawer open/close logic:
  - [ ] Close when clicking outside (backdrop)
  - [ ] Close on Escape key
  - [ ] Close on nav link click
- [ ] Highlight active page automatically using window.location.pathname.
- [ ] Smooth scrolling for anchor links.
- [ ] Apply sticky navbar shadow + background changes on scroll.

## Phase 4: UI polish & accessibility
- [ ] Add :focus-visible styles for links/buttons/inputs.
- [ ] Ensure scroll padding so content isn’t hidden behind sticky navbar.

## Phase 5: Verification
- [ ] Manually test desktop + mobile for all pages.
- [ ] Verify keyboard navigation and ARIA behavior.
- [ ] Run any available lint/build steps (if present).

