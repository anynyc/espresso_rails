class Favorite < ApplicationRecord

  belongs_to :user
  belongs_to :video, class_name: "Video", foreign_key: :video_id
end
