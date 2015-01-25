class CreateGroupings < ActiveRecord::Migration
  def change
    create_table :groupings do |t|
      t.string :project_id
      t.text :cache

      t.timestamps
    end
  end
end
