class CreateSteps < ActiveRecord::Migration
  def change
    create_table :steps do |t|
      t.string :user_id
      t.integer :current_step

      t.timestamps
    end
  end
end
