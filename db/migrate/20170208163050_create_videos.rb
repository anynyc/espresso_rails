class CreateVideos < ActiveRecord::Migration[5.0]
  def change
    create_table :videos do |t|
      t.string :video_url
      t.string :gif_url
      t.string :headline
      t.datetime :date

      t.timestamps
    end
  end
end
