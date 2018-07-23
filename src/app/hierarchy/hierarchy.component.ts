import {Component, OnInit, ViewEncapsulation} from '@angular/core';

import * as d3 from 'd3';
import {HierarchyService} from './hierarchy.service';
import {HierarchyNode} from 'd3';

@Component({
  selector: 'app-hierarchy',
  templateUrl: './hierarchy.component.html',
  styleUrls: ['./hierarchy.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HierarchyComponent implements OnInit {
  private svg;

  private window = document.querySelector('html');

  private windowW = window.innerWidth;
  private windowH = window.innerHeight;

  // Set the dimensions and margins of the diagram
  private margin = {top: 20, right: 20, bottom: 20, left: 20};
  private width = this.windowW - this.margin.left - this.margin.right;
  private height = this.windowH - this.margin.top - this.margin.bottom;

  private i = 0;
  private zoomable_layer;
  private rectW = 230;
  private rectH = 140;
  private spaceX = 50;
  private spaceY = 250;
  private duration = 750;
  private root;
  private isCollapse = 1;
  private _data = null;
  private treeData;
  private loadChild;

  private zoomed = () => {
    this.zoomable_layer.attr('transform', d3.event.transform);
  }

  // declares a tree layout and assigns the size
  treemap = d3
    .tree()
    .nodeSize([this.rectW + this.spaceX, this.rectH + this.spaceY]);

  _zoom: any = d3
    .zoom()
    .scaleExtent([0.2, 4])
    .on('zoom', this.zoomed);

  constructor(private hService: HierarchyService) {

  }

  ngOnInit() {
    this.svg = d3
      .select('body')
      .append('svg')
      .attr('width', this.windowW)
      .attr('height', this.windowH);

    this.hService.loadFirstNode().subscribe(data => {
      const bindData = {
        id: 'body',
        data: data,
        callbackFn: this.hService.loadChild
      };

      this.initialOrg(bindData);
    });
  }

  private initialOrg(option) {
    this._data = option.data;

    this.loadChild = option.callbackFn;

    // Assigns parent, children, height, depth
    this.root = d3.hierarchy(this._data, d => {
      return d.children;
    });

    this.root.x0 = this.width / 2;
    this.root.y0 = 0;

    this.svg.call(this._zoom);

    this.zoomable_layer = this.svg.append('g').attr('class', 'container');

    // Collapse after the second level
    this.root.children.forEach(this.collapse);

    //Zoom
    d3.select('.btn_in').on('click', () => {
      this._zoom.scaleBy(this.svg, 1.2);
    });

    d3.select('.btn_out').on('click', () => {
      this._zoom.scaleBy(this.svg, 0.8);
    });

    this.update(this.root);
    this.centerNode(this.root, () => {});
  }

  // Collapse the node and all it's children

  collapse = (d: any) => {
    if (d.children) {
      d._children = d.children;
      d._children.forEach(this.collapse);
      d.children = null;
    }
  };

  update = source => {
    // Assigns the x and y position for the nodes
    this.treeData = this.treemap(this.root);

    // Compute the new tree layout.
    const nodes = this.treeData.descendants(),
      links = this.treeData.descendants().slice(1);

    // Normalize for fixed-depth.
    nodes.forEach(d => {
      d.y = d.depth * 280;
    });

    // ****************** Nodes section ***************************

    // Update the nodes...
    const node = this.zoomable_layer.selectAll('g.node').data(nodes, d => {
      return d.id || (d.id = ++this.i);
    });

    // Enter any new modes at the parent's previous position.
    const nodeEnter = node
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('id', d => {
        return 'node_' + d.id;
      })
      .attr('transform', d => {
        return 'translate(' + source.x0 + ',' + source.y0 + ')';
      });

    nodeEnter
      .append('rect')
      .attr('class', 'node-card')
      .attr('id', d => {
        return 'rect_' + d.id;
      })
      .attr('rx', 5)
      .attr('ry', 5)
      .attr('width', this.rectW)
      .attr('height', this.rectH)
      .attr('cursor', 'pointer')
      .attr('x', (this.rectW / 2) * -1)
      .attr('y', (this.rectH / 2) * -1)
      .on('click', this.click)
      .on('mouseover', () => {
        d3.select(d3.event.currentTarget).classed('hover', true);
      })
      .on('mouseleave', () => {
        d3.select(d3.event.currentTarget).classed('hover', false);
      });

    // Add labels for the nodes
    nodeEnter
      .append('text')
      .attr('dy', '.35em')
      .attr('x', d => {
        return 0;
      })
      .attr('fill', '#000')
      .attr('text-anchor', d => {
        return 'middle';
      })
      .text(d => {
        console.log('text ', d);

        return d.data.name;
      });

    // UPDATE
    const nodeUpdate = nodeEnter.merge(node);

    // Transition to the proper position for the node
    nodeUpdate
      .transition()
      .duration(this.duration)
      .attr('transform', d => {
        return 'translate(' + d.x + ',' + d.y + ')';
      });

    // Remove any exiting nodes
    const nodeExit = node
      .exit()
      .transition()
      .duration(this.duration)
      .attr('transform', d => {
        return 'translate(' + source.x + ',' + source.y + ')';
      })
      .remove();

    // On exit reduce the opacity of text labels
    nodeExit.select('text').style('fill-opacity', 1e-6);

    // ****************** links section ***************************

    // Update the links...
    const link = this.zoomable_layer.selectAll('path.link').data(links, d => {
      return d.id;
    });

    // Enter any new links at the parent's previous position.
    const linkEnter = link
      .enter()
      .insert('path', 'g')
      .attr('class', 'link')
      .style('stroke-linejoin', 'round')
      .attr('d', d => {
        const o = {x: source.x0, y: source.y0};
        return this.diagonal(o, o);
      });

    // UPDATE
    const linkUpdate = linkEnter.merge(link);

    // Transition back to the parent element position
    linkUpdate
      .transition()
      .duration(this.duration)
      .attr('d', d => {
        return this.diagonal(d, d.parent);
      });

    // Remove any exiting links
    const linkExit = link
      .exit()
      .transition()
      .duration(this.duration)
      .attr('d', d => {
        const o = {x: source.x, y: source.y};
        return this.diagonal(o, o);
      })
      .remove();

    // Store the old positions for transition.
    nodes.forEach(d => {
      d.x0 = d.x;
      d.y0 = d.y;
    });
  };

  // Creates a curved (diagonal) path from parent to the child nodes
  diagonal = (s, d) => {
    return (
      'M' +
      d.x +
      ',' +
      d.y +
      ' ' +
      d.x +
      ' ' +
      (d.y + s.y) / 2 +
      ' ' +
      s.x +
      ' ' +
      (d.y + s.y) / 2 +
      ' ' +
      s.x +
      ' ' +
      s.y
    );
  };

  // Toggle children on click.
  click = d => {
    d3.event.preventDefault();

    d3.selectAll('rect.node-card').classed('selected', false);
    d3.select(d3.event.currentTarget).classed('selected', true);
    console.log('Check ', !d.children, !d._children);

    if (!d.children && !d._children) {
      console.log('Has Child', d);

      this.loadChild(d, childs => {
        console.log('Befor call ', childs);

        const responds = {
          id: d.id,
          children: childs
        };

        responds.children.forEach(child => {
          if (!this.treemap(d)['_children']) {
            this.treemap(d)['_children'] = [];
          }

          const obj: any = d3.hierarchy(child);
          obj.data.parent = d.name;
          obj.depth = d.depth + 1;
          obj.parent = d;
          obj.name = d.name;
          obj.x = d.x;
          obj.y = d.y;
          obj.x0 = d.x0;
          obj.y0 = d.y0;

          this.treemap(d)['_children'].push(obj);
        });

        if (d.children) {
          d._children = d.children;
          d.children = null;
        } else {
          d.children = d._children;
          d._children = null;
        }

        this.update(d);
      });
    } else {
      if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }

      this.update(d);
    }

    this.centerNode(d, () => {});
  };

  centerNode = (source, callback) => {
    const t = d3.zoomTransform(this.svg.node());
    let x = -source.x0;
    let y = -source.y0;
    x = x * t.k + this.width / 2;
    y = y * t.k + this.height / 2;

    d3.select('svg')
      .transition()
      .duration(this.duration)
      .call(this._zoom.transform, <any>(
        d3.zoomIdentity.translate(x, y).scale(t.k)
      ));
  };


}
