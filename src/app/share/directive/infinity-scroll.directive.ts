import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2
} from "@angular/core";

const TRACK_ITEM_TAG_NAME = "DIV";

@Directive({
  selector: "[infiniteScrollLoadMore]"
})
export class InfiniteScrollLoadMoreDirective implements OnInit, OnDestroy {
  mutationObserver: MutationObserver;
  intersectionObserver: IntersectionObserver;
  isIntersection = true;
  isSending = false;

  @Output() loadMore = new EventEmitter<void>();

  @Input() trackItemName = TRACK_ITEM_TAG_NAME;
  @Input("isComplete") set isLoadComplete(isComplete: boolean) {
    const displayStatus = isComplete ? "none" : "block";
    this.render2.setStyle(
      this.elementRef.nativeElement,
      "display",
      displayStatus
    );
  }

  @Input("listElement") set setListElement(element: HTMLElement) {
    this.mutationObserver = new MutationObserver(
      this.mutationObserverHandler.bind(this)
    );
    this.mutationObserver.observe(element, {
      childList: true,
      subtree: false
    });
  }

  constructor(
    private readonly elementRef: ElementRef,
    private readonly render2: Renderer2
  ) {}

  ngOnInit() {
    this.intersectionObserver = new IntersectionObserver(
      this.intersectionHandler.bind(this)
    );
    this.intersectionObserver.observe(this.elementRef.nativeElement);
  }

  ngOnDestroy() {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }

    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }

  private intersectionHandler(entry: IntersectionObserverEntry[]) {
    this.isIntersection = entry[0].isIntersecting;
    if (this.isSending) {
      return;
    }
    if (this.isIntersection) {
      this.isSending = true;
      this.loadMore.emit();
    }
  }

  private mutationObserverHandler(mutations?: MutationRecord[]) {
    const mutationsLength = mutations.length;
    const isListChange =
      mutations[mutationsLength - 1].addedNodes[0]?.nodeName ===
      this.trackItemName;
    this.isSending = false;
    if (this.isIntersection && isListChange) {
      this.isSending = true;
      this.loadMore.emit();
    }
  }
}
