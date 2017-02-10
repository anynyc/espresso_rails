class AddEmojisToVideos < ActiveRecord::Migration[5.0]
  def change
    add_column :videos, :emoji_one, :string
    add_column :videos, :emoji_two, :string
    add_column :videos, :emoji_three, :string
  end
end
