package instagrandma.instagrandma.service;

import instagrandma.instagrandma.entity.Post;
import instagrandma.instagrandma.entity.User;
import instagrandma.instagrandma.repository.PostRepository;
import instagrandma.instagrandma.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.io.File;


@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    @Transactional
    public void savePost(String loginPhone, String postName, LocalDateTime uploadTime, String imageUrl) {
        Post post = new Post();
        User userId = userRepository.findByUserPhone(loginPhone).orElse(null);
        post.setUserId(userId);
//        post.setUserName(userName);
        post.setPostName(postName);
        post.setPostTime(uploadTime);
        post.setImageUrl(imageUrl);
        postRepository.save(post);
    }

    @Transactional
    public List<Post> findAll() {
        List<Post> postList = postRepository.findAll();
        return postList;
    }
//    public void deleteByPost(Long post_id, String loginPhone) {
//        Optional<Post> optionalPost = postRepository.findById(post_id);
//        if(optionalPost.get().getUserPhone().equals(loginPhone)) {
//            postRepository.deleteById(post_id);
//            String imgPath = "/Users/mung/Documents/멍족/해커톤/찐막/InstaGrandma/src/main/resources/static/uploads/" + optionalPost.get().getPostName(); // 절대 경로
//            if (imgPath != null) {
//                File imageFile = new File(imgPath);
//                if (imageFile.exists()) {
//                    imageFile.delete(); // 파일 삭제
//                    System.out.println(optionalPost.get().getUserPhone()+"님의 "+optionalPost.get().getPostName()+" 게시물이 삭제되었습니다.");
//                }
//            }
//        }
//        else {
//            System.out.println("해당 게시물은 유저님의 게시물이 아닙니다.");
//        }
//    }
}
