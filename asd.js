/**
 * Created by jufei on 2017/4/14.
 */
const a = (
  <App>
    <TableView
      state={
        ...data
      }
      dockContent
      tableClick => dockContent = <Edit saveClick={this.saveClick} id={this.state.id}/>
      newClick => dockContent = <New saveClick={this.saveClick} id={this.state.id}/>
      limitClick => dockContetn = <Limit saveClick=={this.saveClick} id={this.state.id}/>

      filterClick => get data by choose => setState =>render new TableView
    >




      <Table clickHandle={this.tableClick} limitClick={this.limitClick} />




      <Dock>
        {dockContent}
      </Dock>
    </TableView>
  </App>
);
