import { Component, Injectable, OnInit } from '@angular/core';
import { ForumService } from '../../../../../shared/forum.service';
import { Post } from '../../../../../models/post.model';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';

const LOAD_MORE: Post = {
  _id: 'a13123213h132123',
  pinned: false,
  contents: 'WHAT',
  author: 'eekpo1',
  replies: [],
};

export class MoreNode {
  childrenChange = new BehaviorSubject<MoreNode[]>([]);

  get children(): MoreNode[] {
    return this.childrenChange.value;
  }

  constructor(
    public item: Post,
    public hasChildren: boolean,
    public parent: Post | null = null
  ) {}
}

export class MoreFlatNode {
  constructor(
    public item: Post,
    public level = 1,
    public expandable = false,
    public parent: Post | null = null
  ) {}
}

@Injectable()
export class PostDB {
  maxPosts = 3;
  dataChange = new BehaviorSubject<MoreNode[]>([]);
  dataMap = new Map<Post, Post[]>();
  nodeMap = new Map<Post, MoreNode>();
  root: Post;
  wrapper: Post[] = [];

  constructor(
    private route: ActivatedRoute,
    private forumService: ForumService
  ) {
    let id = 0;
    this.route.params.subscribe((params) => {
      id = +params.id;
    });
    this.forumService.threads.subscribe((threads) => {
      this.root = threads[id];
      this.root.replies.push(LOAD_MORE);
      this.wrapper.push(this.root);
    });
    this.createMap();
  }

  initialize() {
    console.log(this.dataMap);
    const data = this.wrapper.map((name) => this._generateNode(name));
    console.log(data);
    this.dataChange.next(data);
  }

  private createMap() {
    this.dataMap.set(this.root, this.root.replies);
    // Check if replies has a length
    if (this.root.replies && this.root.replies.length > 0) {
      this.dfs(this.root.replies);
    }
  }

  private dfs(replies: Post[]) {
    if (replies.length === 0) {
      return;
    } else {
      for (const reply of replies) {
        this.dataMap.set(reply, !reply.replies ? [LOAD_MORE] : reply.replies);
        this.dfs(reply.replies);
      }
    }
  }

  loadMore(item: Post, onlyFirstTime = false) {
    if (!this.nodeMap.has(item) || this.dataMap.has(item)) {
      return;
    }
    const parent = this.nodeMap.get(item);
    const children = this.dataMap.get(item);
    // tslint:disable-next-line:no-non-null-assertion
    if (onlyFirstTime && parent.children!.length > 0) {
      return;
    }

    // tslint:disable-next-line:no-non-null-assertion
    const newChildrenNumber = parent.children!.length + this.maxPosts;
    const nodes = children
      .slice(0, newChildrenNumber)
      .map((name) => this._generateNode(name));
    if (newChildrenNumber < children.length) {
      nodes.push(new MoreNode(LOAD_MORE, false, item));
    }

    parent.childrenChange.next(nodes);
    this.dataChange.next(this.dataChange.value);
  }

  private _generateNode(item: Post): MoreNode {
    if (this.nodeMap.has(item)) {
      return this.nodeMap.get(item);
    }
    const result = new MoreNode(item, this.dataMap.has(item));
    this.nodeMap.set(item, result);
    return result;
  }
}

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  providers: [PostDB],
})
export class PostComponent implements OnInit {
  post: Post;
  id: number;
  forumIdx = this.forumService.getIndices().keys()[this.forumService.idx];

  nodeMap = new Map<Post, MoreFlatNode>();
  treeControl: FlatTreeControl<MoreFlatNode>;
  treeFlattener: MatTreeFlattener<MoreNode, MoreFlatNode>;

  dataSource: MatTreeFlatDataSource<MoreNode, MoreFlatNode>;

  constructor(
    private route: ActivatedRoute,
    private forumService: ForumService,
    private db: PostDB
  ) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren
    );

    this.treeControl = new FlatTreeControl<MoreFlatNode>(
      this.getLevel,
      this.isExpandable
    );

    this.dataSource = new MatTreeFlatDataSource<MoreNode, MoreFlatNode>(
      this.treeControl,
      this.treeFlattener
    );

    this.db.dataChange.subscribe((data) => {
      console.log(data);
      this.dataSource.data = data;
      console.log(this.dataSource.data);
    });

    this.db.initialize();
  }

  getChildren = (node: MoreNode): Observable<MoreNode[]> => node.childrenChange;

  transformer = (node: MoreNode, level: number) => {
    const existingNode = this.nodeMap.get(node.item);

    if (existingNode) {
      return existingNode;
    }

    const newNode = new MoreFlatNode(
      node.item,
      level,
      node.hasChildren,
      node.parent
    );
    this.nodeMap.set(node.item, newNode);
    return newNode;
  };

  getLevel = (node: MoreFlatNode) => node.level;

  isExpandable = (node: MoreFlatNode) => node.expandable;

  hasChild = (_: number, nodeData: MoreFlatNode) => nodeData.expandable;
  isLoadMore = (_: number, nodeData: MoreFlatNode) =>
    // tslint:disable-next-line:semicolon
    nodeData.item === LOAD_MORE;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params.thread;
    });

    this.forumService.threads.subscribe((threads) => {
      this.post = threads[this.id];
    });
  }

  loadMore(item: Post) {
    this.db.loadMore(item);
  }

  loadChildren(node: MoreFlatNode) {
    this.db.loadMore(node.item, true);
  }
}
